//@ts-nocheck
import { useMutation, useQuery, useQueryClient } from "react-query";
import { styled } from "styled-components";
import { addResource, fetchAllSkills } from "../utils/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormFields, SkillType } from "../utils/types";
import { extractSelectedItems, isValidEmail } from "../utils/helpers";

const ModalContainer = styled.article`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CloseIcon = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const ModelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
`;
const ModalContentContainer = styled.div`
  background-color: white;
  width: 600px;
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.2);
`;
const ModalBodyContainer = styled.div`
  padding: 1rem;
`;
const ModalTitle = styled.span`
  font-weight: bold;
  padding: 20px 0px 0px 20px;
  align-self: flex-start;
`;
const Form = styled.form`
  margin: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  display: block;
  font-weight: bold;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 530px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #6852e2;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  width: 200px;
`;
const CheckboxItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  align-items: center;
`;
const Required = styled.span`
  color: red;
  font-size: 14px;
`;
const SectionLabel = styled.label`
  font-size: 14px;
  display: block;
  font-weight: bold;
  margin-bottom: 14px;
  margin-top: 20px;
`;
const Alert = styled.div`
  color: #f44336;
  margin-top: 5px;
  font-size: 12px;
  font-weight: bold;
`;

type AddResourceProps = {
  handleDisplayModal: () => void;
  handleResourceClick: (resource: ResourceType) => void;
};

const AddResource = ({
  handleDisplayModal,
  handleResourceClick,
}: AddResourceProps) => {
  const queryClient = useQueryClient();
  const { data: skills } = useQuery(["skills"], fetchAllSkills);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormFields>();

  const { mutateAsync: addResourceData, isLoading } = useMutation({
    mutationFn: (formData: FormFields) => addResource(formData),
    onSuccess: (data, vaiables) => {
      queryClient.invalidateQueries(["resources"], ["resource", data.id]);
      handleResourceClick({
        id: data.id,
        name: `${vaiables.firstname} ${vaiables.lastname}`,
      });
      handleDisplayModal();
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (!data.skills.find((item) => item === true)) {
        throw new Error("Atleast one skill should selected");
      }

      const _skills = extractSelectedItems(skills, data.skills);
      const finalData = {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
        skills: _skills,
      };
      await addResourceData(finalData);
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <ModalContainer>
      <ModalContentContainer>
        <ModelHeader>
          <ModalTitle>Create New Resource</ModalTitle>
          <CloseIcon onClick={handleDisplayModal}>X</CloseIcon>
        </ModelHeader>
        <ModalBodyContainer>
          <Form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
            <Label>
              First Name <Required>*</Required>
            </Label>
            <Input
              {...register("firstname", {
                required: "First name required",
              })}
              type="text"
            />
            {errors.firstname && <Alert>{errors.firstname.message}</Alert>}
            <Label>
              Last Name <Required>*</Required>
            </Label>
            <Input
              {...register("lastname", {
                required: "Last name required",
              })}
              type="text"
            />
            {errors.lastname && <Alert>{errors.lastname.message}</Alert>}
            <Label>
              Role <Required>*</Required>
            </Label>
            <Input
              {...register("role", {
                required: "Role required",
              })}
              type="text"
            />
            {errors.role && <Alert>{errors.role.message}</Alert>}
            <Label>
              Email <Required>*</Required>
            </Label>
            <Input
              {...register("email", {
                required: "Email required",
                validate: (value) => {
                  if (!isValidEmail(value)) {
                    return "Email is not valid";
                  }
                  return true;
                },
              })}
              type="text"
            />
            {errors.email && <Alert>{errors.email.message}</Alert>}

            <SectionLabel>
              Skills <Required>*</Required>
            </SectionLabel>
            {skills && (
              <>
                {skills.map((option: SkillType) => (
                  <CheckboxItem key={option.id}>
                    <Controller
                      name={`skills[${option.id - 1}]`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input type="checkbox" {...field} />
                      )}
                    />
                    {option.name}
                  </CheckboxItem>
                ))}
              </>
            )}

            {errors.root && <Alert>{errors.root.message}</Alert>}

            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </Form>
        </ModalBodyContainer>
      </ModalContentContainer>
    </ModalContainer>
  );
};

export default AddResource;

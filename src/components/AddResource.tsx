import { useMutation, useQuery, useQueryClient } from "react-query";
import { addResource, fetchAllSkills } from "../utils/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormFields, ResourceType, SkillType } from "../utils/types";
import { extractSelectedItems, isValidEmail } from "../utils/helpers";

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
      queryClient.invalidateQueries(["resources"]);
      handleResourceClick({
        id: data.id,
        name: `${vaiables.firstname} ${vaiables.lastname}`,
      });
      handleDisplayModal();
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (!data.skills?.find((item: any) => item === true)) {
        throw new Error("Atleast one skill should selected");
      }

      const _skills = extractSelectedItems(skills, data.skills);
      const finalData = {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
        skills: _skills as unknown as SkillType[],
      };
      await addResourceData(finalData);
    } catch (error) {
      setError("root", {
        message: (error as Error).message,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="bg-white w-96 shadow-2xl border-gray-300 border">
        <div className="flex justify-between items-center m-4">
          <span className="font-bold">Create New Resource</span>
          <span className="text-sm cursor-pointer" onClick={handleDisplayModal}>
            X
          </span>
        </div>
        <div className="p-4">
          <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
            <label className="font-bold mt-2">
              First Name <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              {...register("firstname", {
                required: "First name required",
              })}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.firstname && (
              <div className="text-red-500 text-xs mt-1">
                {errors.firstname.message}
              </div>
            )}
            <label className="font-bold mt-2">
              Last Name <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              {...register("lastname", {
                required: "Last name required",
              })}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.lastname && (
              <div className="text-red-500 text-xs mt-1">
                {errors.lastname.message}
              </div>
            )}
            <label className="font-bold mt-2">
              Role <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              {...register("role", {
                required: "Role required",
              })}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.role && (
              <div className="text-red-500 text-xs mt-1">
                {errors.role.message}
              </div>
            )}
            <label className="font-bold mt-2">
              Email <span className="text-red-500 text-sm">*</span>
            </label>
            <input
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
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </div>
            )}
            <label className="font-bold mt-10 mb-10">
              Skills <span className="text-red-500 text-sm">*</span>
            </label>
            {skills && (
              <>
                {skills.map((option: SkillType) => (
                  <div key={option.id} className="flex items-center">
                    <Controller
                      name={`skills.${option.id - 1}`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          {...field}
                          value={field.value ? "true" : "false"}
                          className="mr-2"
                        />
                      )}
                    />
                    <span>{option.name}</span>
                  </div>
                ))}
              </>
            )}
            {errors.root && (
              <div className="text-red-500 text-xs mt-1">
                {errors.root.message}
              </div>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded disabled:opacity-50 mt-6"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResource;

import { actions, isInputError } from "astro:actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { ArrowIcon } from "./ArrowIcon";
import { Wave } from "./Wave";

const queryClient = new QueryClient();

export const NewsletterForm: React.FC = () => {
  const { mutate, status, error } = useMutation(
    { mutationFn: actions.newsletter.subscribe.orThrow },
    queryClient,
  );

  if (status === "success") {
    return (
      <p className="text-center font-medium text-[10px] uppercase tracking-wide md:text-base">
        <Wave>Thanks for signing up! ✌️</Wave>
      </p>
    );
  }

  return (
    <form
      className="flex gap-3 md:gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutate(formData);
      }}
    >
      <input
        required
        type="email"
        name="email"
        placeholder="Join the mailing list."
        aria-invalid={isInputError(error) && error.fields.email !== undefined}
        className="h-7.5 w-51.5 rounded-lg border pt-0.5 text-center font-medium text-xs tracking-wider outline-none aria-invalid:border-red-400 md:h-11 md:w-75.5 md:rounded-xl md:pt-0.75 md:text-base"
      />
      <button
        disabled={status === "pending"}
        type="submit"
        className="flex size-7.5 not-disabled:cursor-pointer items-center justify-center rounded-lg border hover:border-none hover:bg-purple hover:text-black focus-visible:outline focus-visible:outline-purple focus-visible:-outline-offset-1 md:size-11 md:rounded-xl"
      >
        {status === "pending" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3.5 animate-spin fill-current md:size-5.75"
            viewBox="0 0 256 256"
          >
            <title>loading spinner</title>
            <path d="M140 32v32a12 12 0 0 1-24 0V32a12 12 0 0 1 24 0m84 84h-32a12 12 0 0 0 0 24h32a12 12 0 0 0 0-24m-42.26 48.77a12 12 0 1 0-17 17l22.63 22.63a12 12 0 0 0 17-17ZM128 180a12 12 0 0 0-12 12v32a12 12 0 0 0 24 0v-32a12 12 0 0 0-12-12m-53.74-15.23L51.63 187.4a12 12 0 0 0 17 17l22.63-22.63a12 12 0 1 0-17-17M76 128a12 12 0 0 0-12-12H32a12 12 0 0 0 0 24h32a12 12 0 0 0 12-12m-7.4-76.37a12 12 0 1 0-17 17l22.66 22.6a12 12 0 0 0 17-17Z" />
          </svg>
        ) : (
          <ArrowIcon className="size-3.5 fill-current md:size-5.75" />
        )}
      </button>
    </form>
  );
};

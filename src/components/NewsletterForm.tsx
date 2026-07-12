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
      <p className="font-medium text-xs uppercase leading-7.5 tracking-wide md:text-lg md:leading-11">
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
        className="h-7.5 w-51.5 rounded-lg border pt-0.5 text-center font-medium tracking-wider outline-none aria-invalid:border-red-400 max-md:text-xs md:h-11 md:w-75.5 md:rounded-xl md:pt-0.75"
      />
      <button
        disabled={status === "pending"}
        type="submit"
        className="flex size-7.5 not-disabled:cursor-pointer items-center justify-center rounded-lg border hover:border-none hover:bg-purple hover:text-black focus-visible:outline focus-visible:outline-purple focus-visible:-outline-offset-1 md:size-11 md:rounded-xl"
      >
        <ArrowIcon className="size-3.5 fill-current md:size-5.75" />
      </button>
    </form>
  );
};

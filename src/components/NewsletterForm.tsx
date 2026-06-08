import { actions, isInputError } from "astro:actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import ArrowIcon from "../assets/icons/arrow.svg?react";
import { Wave } from "./Wave";

const queryClient = new QueryClient();

export const NewsletterForm: React.FC = () => {
  const { mutate, status, error } = useMutation(
    { mutationFn: actions.newsletter.subscribe.orThrow },
    queryClient,
  );

  if (status === "success") {
    return (
      <>
        <p className="font-bold text-lg uppercase tracking-wide">
          <Wave>Thanks for signing up! ✌️</Wave>
        </p>
        <p>We won't bother you often, we hate that shit.</p>
      </>
    );
  }

  return (
    <>
      <form
        className="flex gap-4"
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
          placeholder="Email"
          aria-invalid={isInputError(error) && error.fields.email !== undefined}
          className="h-11 w-2xs rounded-xl border text-center font-bold tracking-wider focus-visible:outline focus-visible:outline-purple focus-visible:-outline-offset-1 aria-invalid:border-red-400"
        />
        <button
          disabled={status === "pending"}
          type="submit"
          className="flex size-11 not-disabled:cursor-pointer items-center justify-center rounded-xl border hover:border-none hover:bg-purple hover:text-black focus-visible:outline focus-visible:outline-purple focus-visible:-outline-offset-1"
        >
          <ArrowIcon className="size-5.75 fill-current" />
        </button>
      </form>
      <p className="text-center tracking-wide">Join for updates & discounts.</p>
    </>
  );
};

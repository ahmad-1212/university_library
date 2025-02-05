import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./ui/spinner";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (
    data: T
  ) => Promise<{ success: boolean; error?: string; type?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    setIsLoading(true);
    const result = await onSubmit(data);
    setIsLoading(false);
    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      router.push("/");
    } else {
      if (isSignIn) {
        form.setError("email" as Path<T>, {
          type: "string",
          message: result.error,
        });
        form.setError("password" as Path<T>, {
          type: "string",
          message: result.error,
        });
      }

      if (result?.type && result?.type?.toLowerCase() !== "error") {
        form.setError(result.type as Path<T>, {
          type: "string",
          message: result.error,
        });
      }
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occured!",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        accept="image/*"
                        placeholder="Upload your ID"
                        type="image"
                        variant="dark"
                        folder="ids"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="form-btn disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner variant="black" className="border-2" />
            ) : null}
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-base font-medium">
          {isSignIn ? "New to BookWise?" : "Already have an account?"}
          <Link
            className="font-bold text-primary"
            href={isSignIn ? "/sign-up" : "sign-in"}
          >
            {isSignIn ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default AuthForm;

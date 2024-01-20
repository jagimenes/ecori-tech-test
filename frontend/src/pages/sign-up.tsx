"use client";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from "zod";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "@phosphor-icons/react";
import { api } from "@/lib/api";

const formSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
  passwordConfirmation: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function signUp(data: FormData) {
    console.log(data);

    const response = await api.post("/users", data);

    if (response.status === 201) navigate("/");
  }

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signUp)}
          className="flex flex-col max-w-sm w-full gap-8"
        >
          <div className="flex flex-col gap-2">
            <strong className="text-3xl font-semibold">Create account</strong>
            <span className="text-sm text-zinc-500">
              Fill the fields with your data to create your account.
            </span>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>E-mail</FormLabel>

                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Password Confirmation</FormLabel>

                <FormControl>
                  <Input placeholder="Password Confirmation" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <Button>Verify</Button>
            <Button type="button" variant="secondary" disabled>
              Resend code (60)
            </Button>
          </div>

          <Button type="button" variant="link" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </form>
      </Form>
    </div>
  );
}

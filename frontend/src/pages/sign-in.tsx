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
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export function SignIn() {
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const setCredentials = useAuthStore((state) => state.setCredentials);

  async function signIn(data: FormData) {
    console.log(data);

    const response = await api.post("/login", data);

    if (response.status === 200) {
      setCredentials({
        token: response.data.token,
        user: {
          id: response.data.user.id,
          email: response.data.user.email,
          username: response.data.user.username,
        },
      });

      navigate("/");
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signIn)}
          className="flex flex-col max-w-sm w-full gap-8"
        >
          <div className="flex flex-col gap-2">
            <strong className="text-3xl font-semibold">Sign in</strong>
            <span className="text-sm text-zinc-500">Welcome back 👋</span>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input placeholder="Email" {...field} />
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

          <Button>Sign in</Button>
        </form>
      </Form>
    </div>
  );
}

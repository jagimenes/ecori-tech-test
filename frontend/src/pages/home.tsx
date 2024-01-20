import { Navigate } from "react-router-dom";
import { Table } from "@radix-ui/themes";
import { useAuthStore } from "@/stores/auth";

export function Home() {
  const user = useAuthStore((state) => state.user);

  if (!user?.username) {
    return <Navigate to="/create-name" replace />;
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <Table.Root size={"3"} variant="ghost">
        <Table.Header>
          <Table.Row align={"start"}>
            <Table.Cell justify={"start"} className="font-bold">
              Title
            </Table.Cell>
            <Table.Cell justify={"start"} className="font-bold">
              Description
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row align={"start"}>
            <Table.Cell>Danilo Sousa</Table.Cell>
            <Table.Cell>danilo@example.com</Table.Cell>
          </Table.Row>

          <Table.Row align={"start"}>
            <Table.Cell>Zahra Ambessa</Table.Cell>
            <Table.Cell>zahra@example.com</Table.Cell>
          </Table.Row>

          <Table.Row align={"start"}>
            <Table.Cell>Jasper Eriksson</Table.Cell>
            <Table.Cell>jasper@example.com</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
}

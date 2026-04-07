import React from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "@/components/ui";
import type {
  Client,
  ClientValidationErrors,
} from "../components/Clients/types";
import { STATUS_ORDER } from "../components/Clients/constants";
import { useClientsManager } from "../components/Clients";
import { PageHeader } from "../components/common";

type ClientFormMode = "create" | "edit";

interface ClientFormPageProps {
  mode: ClientFormMode;
}

interface CreateLocationState {
  seedQuery?: string;
}

const ClientFormPage: React.FC<ClientFormPageProps> = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId } = useParams();
  const locationState = location.state as CreateLocationState | null;

  const { getClientById, buildClientDraft, saveClient } = useClientsManager({
    query: "",
    statusFilter: "All",
    sortBy: "value-desc",
    page: 1,
    pageSize: 25,
  });
  const isEdit = mode === "edit";
  const existingClient =
    isEdit && clientId ? getClientById(clientId) : undefined;

  const [errors, setErrors] = React.useState<ClientValidationErrors>({});
  const [draftClient, setDraftClient] = React.useState<Client>(() => {
    if (existingClient) {
      return { ...existingClient };
    }

    return buildClientDraft(locationState?.seedQuery ?? "");
  });

  React.useEffect(() => {
    if (!existingClient || !isEdit) {
      return;
    }

    setDraftClient({ ...existingClient });
  }, [existingClient, isEdit]);

  if (isEdit && !existingClient) {
    return (
      <div className="dash-stack">
        <PageHeader
          title="Client not found"
          subtitle="The client you tried to edit does not exist anymore."
          actions={
            <Button
              type="button"
              variant="outline"
              className="gap-2 min-h-11"
              onClick={() => navigate("/dashboard/clients")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to clients
            </Button>
          }
        />
      </div>
    );
  }

  const updateDraft = (updater: (previous: Client) => Client) => {
    setDraftClient((previous) => updater(previous));
  };

  const backHref =
    isEdit && clientId ? `/dashboard/clients/${clientId}` : "/dashboard/clients";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = saveClient(draftClient);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    if (isEdit && clientId) {
      navigate(`/dashboard/clients/${clientId}`);
      return;
    }
    navigate("/dashboard/clients");
  };

  return (
    <div className="dash-stack">
      <PageHeader
        className="gap-5 md:gap-6"
        titleClassName="text-2xl sm:text-3xl lg:text-4xl"
        title={isEdit ? "Edit client" : "Add new client"}
        subtitle={
          isEdit
            ? "Update client profile and contact details"
            : "Create a new client profile and save it to your dashboard"
        }
        actions={
          <Button
            type="button"
            variant="outline"
            className="gap-2 min-h-11"
            onClick={() => navigate(backHref)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="premium-card p-5 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Client Name
            </label>
            <Input
              value={draftClient.name}
              onChange={(event) =>
                updateDraft((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              className="w-full bg-background rounded-xl px-4 min-h-11 text-sm font-semibold text-foreground"
              placeholder="Acme Holdings"
            />
            {errors.name && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Industry
            </label>
            <Input
              value={draftClient.industry}
              onChange={(event) =>
                updateDraft((previous) => ({
                  ...previous,
                  industry: event.target.value,
                }))
              }
              className="w-full bg-background rounded-xl px-4 min-h-11 text-sm font-semibold text-foreground"
              placeholder="Technology"
            />
            {errors.industry && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-500">
                {errors.industry}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </label>
            <Input
              value={draftClient.email}
              onChange={(event) =>
                updateDraft((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
              className="w-full bg-background rounded-xl px-4 min-h-11 text-sm font-semibold text-foreground"
              placeholder="hello@client.com"
            />
            {errors.email && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Phone
            </label>
            <Input
              value={draftClient.phone}
              onChange={(event) =>
                updateDraft((previous) => ({
                  ...previous,
                  phone: event.target.value,
                }))
              }
              className="w-full bg-background rounded-xl px-4 min-h-11 text-sm font-semibold text-foreground"
              placeholder="+1-555-0100"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Website
            </label>
            <Input
              value={draftClient.website}
              onChange={(event) =>
                updateDraft((previous) => ({
                  ...previous,
                  website: event.target.value,
                }))
              }
              className="w-full bg-background rounded-xl px-4 min-h-11 text-sm font-semibold text-foreground"
              placeholder="https://client.com"
            />
            {errors.website && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-500">
                {errors.website}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Lifetime Value
            </label>
            <Input
              type="number"
              min={0}
              value={draftClient.value}
              onChange={(event) =>
                updateDraft((previous) => ({
                  ...previous,
                  value: Math.max(0, Number(event.target.value || 0)),
                }))
              }
              className="w-full bg-background rounded-xl px-4 min-h-11 text-sm font-semibold text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Momentum %
            </label>
            <Input
              type="number"
              value={draftClient.growth}
              onChange={(event) =>
                updateDraft((previous) => ({
                  ...previous,
                  growth: Number(event.target.value || 0),
                }))
              }
              className="w-full bg-background rounded-xl px-4 min-h-11 text-sm font-semibold text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Protocol Status
            </label>
            <div className="flex flex-wrap gap-2">
              {STATUS_ORDER.map((status) => (
                <Button
                  key={status}
                  type="button"
                  onClick={() =>
                    updateDraft((previous) => ({
                      ...previous,
                      status,
                    }))
                  }
                  variant="outline"
                  className={`px-4 py-2 rounded-xl h-auto text-[10px] font-semibold uppercase tracking-[0.15em] border border-transparent ${
                    draftClient.status === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/20 text-foreground"
                  }`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 border-transparent bg-muted/20 hover:bg-muted/30"
            onClick={() => navigate(backHref)}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2 min-h-11">
            <Save className="w-4 h-4" />
            {isEdit ? "Save Changes" : "Create Client"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export const NewClientForm: React.FC = () => {
  return <ClientFormPage mode="create" />;
};

export const EditClientForm: React.FC = () => {
  return <ClientFormPage mode="edit" />;
};

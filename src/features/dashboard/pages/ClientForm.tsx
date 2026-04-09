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

  const updateDraft = (updater: (previous: Client) => Client) => {
    setDraftClient((previous) => updater(previous));
  };

  const handleClose = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/dashboard/clients");
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await saveClient(draftClient);
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
            onClick={handleClose}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="premium-card p-5 md:p-6 lg:p-8">
        <div className="space-y-7">
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Company Information
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Basic profile details used across client records.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
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
                  className="h-11 rounded-lg border-border bg-background px-3 text-sm"
                  placeholder="Acme Holdings"
                />
                {errors.name && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
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
                  className="h-11 rounded-lg border-border bg-background px-3 text-sm"
                  placeholder="Technology"
                />
                {errors.industry && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.industry}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Contact Details
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Primary communication channels for this client.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
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
                  className="h-11 rounded-lg border-border bg-background px-3 text-sm"
                  placeholder="hello@client.com"
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
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
                  className="h-11 rounded-lg border-border bg-background px-3 text-sm"
                  placeholder="+1-555-0100"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-foreground">
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
                  className="h-11 rounded-lg border-border bg-background px-3 text-sm"
                  placeholder="https://client.com"
                />
                {errors.website && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.website}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Commercial
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Track account value and operational status.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
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
                  className="h-11 rounded-lg border-border bg-background px-3 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-foreground">
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
                      className={`h-9 rounded-md px-3 text-xs font-medium ${
                        draftClient.status === status
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:bg-muted/40"
                      }`}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-7 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 border-border bg-background hover:bg-muted/30"
            onClick={handleClose}
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

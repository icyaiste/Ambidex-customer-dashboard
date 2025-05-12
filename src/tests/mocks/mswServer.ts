import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const server = setupServer(
  // Installation registrations
  http.get(
    "http://localhost:8004/installation_registrations",
    () => {
      return HttpResponse.json([
        { id: "1", displayName: "Test installation" }
      ]);
    }
  ),
//schedule for installation 
  http.get(
    "http://localhost:8004/schedule",
    ({ request }) => {
      const installationId = new URL(request.url).searchParams.get("installationId");
      if (installationId === "1") {
        return HttpResponse.json([
          {
            id:             "1",
            installationId: "1",
            begin:          "2025-05-09T05:00:00Z",
            end:            "2025-05-09T08:00:00Z",
            type:           "Körning",
            location:      "Test location",
          },
        ]);
      }
      // fallback for other IDs
      return HttpResponse.json([], { status: 404 });
    }
  )
);

export { server };

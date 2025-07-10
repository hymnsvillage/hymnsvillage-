export const userPaths = {
  "/api/user/dashboard/overview": {
    get: {
      summary: "Get dashboard overview stats",
      tags: ["User Dashboard"],
      responses: {
        "200": {
          description: "Returns post, follower, like, impression counts",
          content: { "application/json": {} },
        },
      },
    },
  },
  "/api/user/dashboard/analytics": {
    get: {
      summary: "Get analytics chart data (weekly)",
      tags: ["User"],
      responses: {
        "200": {
          description: "Returns daily view/impression counts",
          content: { "application/json": {} },
        },
      },
    },
  },
  "/api/user/dashboard/recent-comments": {
    get: {
      summary: "Get 4-5 most recent comments on your posts",
      tags: ["User Dashboard"],
      responses: {
        "200": {
          description: "Returns recent comments",
          content: { "application/json": {} },
        },
      },
    },
  },
  "/api/user/follow": {
    post: {
      summary: "Follow a user",
      tags: ["User"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                followed_id: {
                  type: "string",
                  format: "uuid",
                  example: "b6f9d6ae-3f23-4a9b-b13b-f123e4de1ca1",
                },
              },
              required: ["followed_id"],
            },
          },
        },
      },
      responses: {
        "200": { description: "Followed successfully" },
        "400": { description: "Invalid follow target" },
        "401": { description: "Unauthorized" },
        "500": { description: "Internal server error" },
      },
    },
  },
  "/api/user/unfollow": {
    delete: {
      summary: "Unfollow a user",
      tags: ["User"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                followed_id: {
                  type: "string",
                  format: "uuid",
                  example: "b6f9d6ae-3f23-4a9b-b13b-f123e4de1ca1",
                },
              },
              required: ["followed_id"],
            },
          },
        },
      },
      responses: {
        "200": { description: "Unfollowed successfully" },
        "400": { description: "Missing target user" },
        "401": { description: "Unauthorized" },
        "500": { description: "Internal server error" },
      },
    },
  },
};

const AUTH0_REDIRECT_URI =
    process.env.NODE_ENV === "production"
        ? "https://ud-cisc275-s22.github.io/cis-scheduler-team-4/"
        : "http://localhost:3000";

export { AUTH0_REDIRECT_URI };

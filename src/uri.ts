const AUTH0_REDIRECT_URI =
    process.env.NODE_ENV === "production"
        ? "https://ud-cisc275-s22.github.io/cis-scheduler/"
        : "http://localhost:3000/cis-scheduler";

export { AUTH0_REDIRECT_URI };

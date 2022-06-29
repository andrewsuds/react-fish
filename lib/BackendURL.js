const production = true;

const BackendURL = production
  ? "https://api.aks22.com"
  : "http://localhost:3001";

export { BackendURL };

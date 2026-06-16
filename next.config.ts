import type { NextConfig } from "next";

const githubRepositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "GPS-bus-tracking-system";
const githubPagesBasePath = `/${githubRepositoryName}`;
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPagesBuild ? githubPagesBasePath : "",
  assetPrefix: isGithubPagesBuild ? githubPagesBasePath : undefined,
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

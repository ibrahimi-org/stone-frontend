// import ParseBrowser from "parse/node";
import ParseBrowser from "parse";

ParseBrowser.initialize(
  process.env.NEXT_PUBLIC_PARSE_APP_ID!,
  process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY
);

//javascriptKey is required only if you have it on server.

ParseBrowser.serverURL = process.env.NEXT_PUBLIC_PARSE_ADDRESS!;

export default ParseBrowser;

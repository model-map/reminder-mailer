import log from "loglevel";

log.setLevel(process.env.NEXT_PUBLIC_ENV === "production" ? "warn" : "trace");
log.info("In Home Page");

export default function Home() {
  return <div>Home</div>;
}

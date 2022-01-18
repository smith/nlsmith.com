import { redirect } from "remix";

export function handleRedirects(request: Request) {
  const { pathname } = new URL(request.url);

  switch (pathname) {
    case "/a-blog":
      return redirect("/posts/a-blog", 301);
    case "/office":
      return redirect("https://elastic.zoom.us/j/6222697196", 301);
    case "/rat-pack":
      return redirect(
        "https://docs.google.com/presentation/d/1i-peXuymkhkzbNdhgA0LF4Son988kGWQjc8X8STpQ8w/",
        301
      );
    case "/rat-pack-dbq":
      return redirect("/posts/rat-pack-dbq", 301);
    case "/recent-react":
      return redirect(
        "https://docs.google.com/presentation/d/1pLWOnbZ8EntHfKU2tmg3Q-yzDKacE6uPdj1rpYSMz5I/",
        301
      );
    case "/recent-react-2":
      return redirect(
        "https://docs.google.com/presentation/d/1Th5xTcujr7_9xOIOfebt0Akz3F-YYYsZ_dEhIXpuQPc/",
        301
      );
    case "/recent-react-entrefest":
      return redirect("/posts/recent-react-entrefest", 301);
    case "/resume":
      return redirect(
        "https://www.dropbox.com/s/7fbkbin8zwkqwdf/resume.md?dl=0"
      );
    case "/strangeloop-2019":
      return redirect("/posts/strangeloop-2019", 301);
    case "/web-hosting-on-a-dollar-a-month":
      return redirect("/posts/web-hosting-on-a-dollar-a-month", 301);
    default:
      return undefined;
  }
}

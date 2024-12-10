import { ImageResponse } from "@vercel/og";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const OgImageHandler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const _name = searchParams.get("name") || "Base User";
  const name =
    _name.includes(".bst") || _name.includes("base.eth")
      ? _name
      : _name + ".bst";
  const title = searchParams.get("title");
  const avatar = searchParams.get("avatar");
  const subtitle = searchParams.get("subtitle");
  const font = searchParams.get("font") ?? "Poppins";

  const bg = searchParams.get("bg");
  const lightMode = searchParams.get("lightmode") || false;

  async function loadGoogleFont (_font: string, text: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
   
    if (resource) {
      const response = await fetch(resource[1])
      if (response.status == 200) {
        return await response.arrayBuffer()
      }
    }
   
    throw new Error('failed to load font data')
  }


  // const blob = await response.blob();
  // const url = URL.createObjectURL(blob);
  //console.log(url)
  return new ImageResponse(
    (
      <div
        style={{
          background: bg ? bg : lightMode === "true" ? "#f5f5f5" : "#000000",
          width: "100%",
          height: "100%",
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: font,
          flexDirection: "row",
          display: "flex",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {avatar && (
          <img
            alt={name + " Avatar Image"}
            width={300}
            height={300}
            src={avatar}
            style={{ margin: "0 75px", borderRadius: "100%" }}
          />
        )}
        <div
          style={{
            flexDirection: "column",
            display: "flex",
          }}
        >
          {title !== "" && (
            <p
              style={{
                fontSize: 40,
                fontFamily: "CustomFont",
                lineHeight: 1.1,
                maxWidth: 450,
                color: lightMode === "true" ? "#161618" : "#f5f5f5",
                textAlign: "left",
              }}
            >
              {title}
            </p>
          )}
          {subtitle !== "" && (
            <p
              style={{
                fontSize: 30,
                lineHeight: 1.1,
                color: lightMode === "true" ? "#000000ee" : "#ffffffee",
                maxWidth: 450,
                textAlign: "left",
              }}
            >
              {subtitle}
            </p>
          )}

          <p
            style={{
              fontSize: 30,
              lineHeight: 1.1,
              color: lightMode === "true" ? "#00000099" : "#ffffff99",
              maxWidth: 450,
              textAlign: "left",
            }}
          >
            {name}
          </p>
        </div>
      </div>
    ),
    {
      width: 1146,
      height: 600,
      fonts: [
        {
          name: "CustomFont",
          data: await loadGoogleFont(font, name+title+subtitle),
          style: "normal",
        },
      ],
    }
  );
};

export default OgImageHandler;

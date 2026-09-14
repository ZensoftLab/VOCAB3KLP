const ORDER_API_URL = "https://orderapi.englishcommando.bd/api/orders/";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ detail: "Method not allowed" });
  }

  const requestBody =
    typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});

  try {
    const upstreamResponse = await fetch(ORDER_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const responseBody = await upstreamResponse.text();
    res.status(upstreamResponse.status);
    res.setHeader(
      "Content-Type",
      upstreamResponse.headers.get("content-type") || "application/json",
    );
    return res.send(responseBody);
  } catch (error) {
    console.error("Order API proxy error:", error);
    return res.status(502).json({ detail: "Order service unavailable" });
  }
}

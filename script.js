async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const status = document.getElementById("status");
  const output = document.getElementById("output");

  status.textContent = "⏳ Génération en cours...";
  output.src = "";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-base",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) throw new Error("Erreur réseau ou quota dépassé.");

    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    output.src = imgUrl;
    status.textContent = "✅ Image générée avec succès !";
  } catch (err) {
    status.textContent = "❌ Erreur : " + err.message;
  }
}

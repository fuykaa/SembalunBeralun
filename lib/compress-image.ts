import sharp from "sharp"

const GALERI_MAX_PX = 1920
const PROFIL_MAX_PX = 400
const QUALITY = 82

export async function compressGaleri(
  buffer: ArrayBuffer,
  mimeType: string
): Promise<{ data: Buffer; contentType: string }> {
  const buf = Buffer.from(buffer)

  if (mimeType === "image/gif") {
    return { data: buf, contentType: mimeType }
  }

  let instance = sharp(buf).resize(GALERI_MAX_PX, GALERI_MAX_PX, {
    fit: "inside",
    withoutEnlargement: true,
  })

  if (mimeType === "image/png") instance = instance.png({ compressionLevel: 8 })
  else if (mimeType === "image/webp") instance = instance.webp({ quality: QUALITY })
  else instance = instance.jpeg({ quality: QUALITY, progressive: true })

  return { data: await instance.toBuffer(), contentType: mimeType }
}

export async function compressProfil(
  buffer: ArrayBuffer,
  mimeType: string
): Promise<{ data: Buffer; contentType: string }> {
  const buf = Buffer.from(buffer)

  const data = await sharp(buf)
    .resize(PROFIL_MAX_PX, PROFIL_MAX_PX, { fit: "cover", position: "center" })
    .jpeg({ quality: QUALITY })
    .toBuffer()

  return { data, contentType: "image/jpeg" }
}

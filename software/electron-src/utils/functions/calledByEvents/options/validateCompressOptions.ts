type Options = {
  width: string,
  height: string,
  quality: string,
  format: string
}

export function validateCompressOptions(options: Options) {
  let validFormats = ["jpg", "png"];
  let validatedOptions = {
    width: 600,
    height: 400,
    quality: 60,
    format: "jpg"
  }

  if(
    options.width !== "" && 
    parseInt(options.width) <= 2000 && 
    parseInt(options.width) >= 1
  ) {
    validatedOptions.width = parseInt(options.width);
  }
  if(
    options.height !== "" && 
    parseInt(options.height) <= 2000 && 
    parseInt(options.height) >= 1
  ) {
    validatedOptions.height = parseInt(options.height);
  }
  if(
    options.quality !== "" && 
    parseInt(options.quality) <= 100 && 
    parseInt(options.quality) >= 1
  ) {
    validatedOptions.quality = parseInt(options.quality);
  }
  if(validFormats.includes(options.format)) validatedOptions.format = options.format;

  return validatedOptions;
}
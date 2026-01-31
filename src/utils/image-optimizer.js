/**
 * Optimizes Cloudinary URLs by adding auto format, auto quality, and width/height constraints.
 * 
 * @param {string} url - The original Cloudinary URL
 * @param {object} options - Optimization options
 * @param {number} options.width - The desired width
 * @param {number} options.height - The desired height
 * @param {string} options.crop - The crop mode (default: 'fill')
 * @returns {string} - The optimized URL
 */
export const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const { width, height, crop = 'fill' } = options;
  
  // Cloudinary URL format: https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/v[version]/[public_id].[format]
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const beforeUpload = url.substring(0, uploadIndex + 8);
  const afterUpload = url.substring(uploadIndex + 8);

  let transformations = 'f_auto,q_auto';
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (width || height) transformations += `,c_${crop}`;

  // Check if there are already transformations in the URL
  // If the next part doesn't start with 'v' followed by numbers, it might be a transformation
  const nextSlashIndex = afterUpload.indexOf('/');
  const firstPart = afterUpload.substring(0, nextSlashIndex);
  
  if (firstPart.startsWith('v') && !isNaN(firstPart.substring(1))) {
    return `${beforeUpload}${transformations}/${afterUpload}`;
  } else {
    // There are existing transformations, we could merge them but it's simpler to just replace or prepend
    // For this project, let's assume we can prepend our optimizations
    return `${beforeUpload}${transformations}/${afterUpload}`;
  }
};

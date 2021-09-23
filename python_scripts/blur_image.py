image_path = 'assets/testing_progressive_images/compressed_worldview.jpeg'
#Import required Image library
from PIL import Image, ImageFilter

#Open existing image
OriImage = Image.open(image_path)
OriImage.show()

#Applying GaussianBlur filter
gaussImage = OriImage.filter(ImageFilter.GaussianBlur(30))
gaussImage.show()

#Save Gaussian Blur Image
gaussImage.save('assets/testing_progressive_images/compressed_blurred_worldview.jpeg')
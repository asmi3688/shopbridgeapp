import { Box, Image } from "grommet";

const ImageBox = ({ productImg }) => {
    return (
        <Box height="50px" width="50px" round={{ corner: 'left', size: '15px' }}>
            <Image
                fit="cover"
                src={productImg || "https://rejoiz.ug/assets/images/default_images/default-product.png"}
            />
        </Box>
    )
}
export default ImageBox
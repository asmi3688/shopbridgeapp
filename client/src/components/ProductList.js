import React, { useState, useEffect } from 'react';
import {
    Box,
    DataTable,
    Text,
    Image
} from 'grommet';
import { deleteProduct, getProducts } from '../services/product.service';
import ImageBox from './ImageBox';
import swal from 'sweetalert';

const columns = [
    {
        property: 'name',
        header: <Text>Product Name</Text>,
        primary: true,
        render: (datum) => (<Box>{datum.name}</Box>)
    },
    {
        property: 'description',
        header: <Text>Product Description</Text>,
        primary: true,
        render: (datum) => (<Box>{datum.description}</Box>)
    },
    {
        property: 'productImg',
        header: <Text>Product Image</Text>,
        primary: true,
        render: (datum) => (
            <Box id={`img-${datum._id}`} alignContent="center" pad={{ vertical: "small" }}>
                <ImageBox productImg={datum.productImg} />
            </Box>)
    }, {
        property: 'price',
        header: <Text>Price (Rs.)</Text>,
        primary: true,
        render: (datum) => (<Box>{datum.price}</Box>)
    },
    {
        property: 'action',
        header: <Box>Action</Box>,
        primary: true,
        render: (datum) => (
            <Box direction="row" gap="medium">
                <Box onClick={() => {
                    window.location.href = `/product/${datum._id}`
                }}>
                    <Text color="brand">Edit</Text>
                </Box>
                <Box onClick={() => {
                    swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to delete this product?",
                        icon: "warning",
                        dangerMode: true,
                    })
                        .then(willDelete => {
                            if (willDelete) {
                                deleteProduct(datum._id)
                                    .then((res) => {
                                        if (res?.status === 200) {
                                            swal("Deleted!", "Product deleted successfully!!!", "success");
                                            if (true) {
                                                window.location.href = `/products`
                                            }
                                        }
                                    })
                                    .catch((err) => {
                                        const { errorMsg } = err.response.data
                                        swal("Oops!", { errorMsg }, "error");
                                        throw err

                                    })
                            }
                        });
                }}>
                    <Text color="red">Delete</Text>
                </Box>
            </Box>)
    }
]
function Product() {

    const [productData, setProductData] = useState([])

    const getProductList = () => {
        getProducts()
            .then((res) => {
                if (res?.status === 200) {
                    setProductData(res.data.data)
                }
            })
            .catch((err) => {
                const { errorMsg } = err.response.data
                swal("Oops!", { errorMsg }, "error");
                throw err
            })
    }

    useEffect(() => {
        getProductList()
    }, [])


    return (
        <Box pad="small" alignContent="center" align='center' gap="small">
            <Box onClick={() => { window.location.href = "/product" }} width="90%" height="auto" align='start' pad="small" focusIndicator={false}><Text color="brand">Add Product</Text></Box>
            {productData && productData.length > 0 ?
                <Box pad="large" width="90%" height="auto" border="all">
                    <DataTable
                        columns={columns}
                        data={productData}
                        sortable
                        step={5}
                        paginate
                    />
                </Box>
                :
                <Box><Image fit="cover" src="https://www.spireskills.com/assets/images/no-records.png" /></Box>
            }
        </Box>
    );
}

export default Product;
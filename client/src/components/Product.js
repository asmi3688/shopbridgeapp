import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Form,
    FormField, TextInput, Button, TextArea, Text
} from 'grommet';
import swal from 'sweetalert';
import { validateData } from '../validation/validation';
import { addProduct, getProduct, updateProduct } from '../services/product.service';
import ImageBox from './ImageBox';
function Product() {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState({ name: "", description: "", price: "", productImg: "" })
    const [formErrors, setFormErrors] = useState({})
    const hasDataValid = (data) => {
        const checkDataIsValid = validateData(data)
        if (Object.keys(checkDataIsValid).length === 0) {
            setFormErrors({})
            if (productId) {
                updateProduct(data, productId)
                    .then((res) => {
                        if (res?.status === 200) {
                            swal("Success!", "Product updated successfully!!!", "success");
                            if (true) {
                                navigate('/products');
                            }
                        }
                    })
                    .catch((err) => {
                        const { errorMsg } = err.response.data
                        swal("Oops!", { errorMsg }, "error");
                        throw err
                    })

            } else {
                addProduct(data)
                    .then((res) => {
                        if (res?.status === 200) {
                            swal("Success!", "Product added successfully!!!", "success");
                            if (true) {
                                navigate('/products');
                            }
                        }
                    })
                    .catch((err) => {
                        const { errorMsg } = err.response.data
                        swal("Oops!", { errorMsg }, "error");
                        throw err
                    })
            }
        } else {
            setFormErrors({ ...checkDataIsValid })
        }

    }
    const getProductData = () => {
        getProduct(productId)
            .then((res) => {
                if (res?.status === 200) {
                    setValue(res.data.data)
                }
            })
            .catch((err) => {
                const { errorMsg } = err.response.data
                swal("Oops!", { errorMsg }, "error");
                throw err
            })
    }
    useEffect(() => {
        if (productId) {
            getProductData()
        }
    }, [])

    return (
        <Box pad="small" alignContent="center" align='center' gap="medium">
            <Box onClick={() => { window.location.href = "/products" }} focusIndicator={false} width="500px"><Text color="brand">Product List</Text></Box>
            <Box pad="medium" alignContent="center" width="500px" border={{ color: 'brand', size: 'small' }}>
                <Form
                    value={value}
                    onChange={nextValue => setValue(nextValue)}
                    onReset={() => setValue({})}
                    onSubmit={({ value }) => { hasDataValid(value) }}
                >
                    <FormField name="name" htmlFor="name" label="Name">
                        <TextInput id="name" name="name" />
                    </FormField>
                    {
                        formErrors.name && (
                            <Text color="red" size="small">{formErrors.name}</Text>
                        )
                    }
                    <FormField name="description" htmlFor="description" label="Description">
                        <TextArea id="description" name="description" />
                    </FormField>
                    {
                        formErrors.description && (
                            <Text color="red" size="small">{formErrors.description}</Text>
                        )
                    }
                    <FormField name="price" htmlFor="price" label="Price">
                        <TextInput id="price" name="price" />
                    </FormField>
                    {
                        formErrors.price && (
                            <Text color="red" size="small">{formErrors.price}</Text>
                        )
                    }
                    <FormField name="productImg" htmlFor="productImg" label="Product Image">
                        {value?.productImg && (<Box pad="small"><ImageBox productImg={value?.productImg} /></Box>)}
                        <TextInput id="productImg" name="productImg" />
                    </FormField>
                    {
                        formErrors.productImg && (
                            <Text color="red" size="small">{formErrors.productImg}</Text>
                        )
                    }
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label={productId ? "Update" : "Submit"} />
                        <Button type="reset" label="Reset" />
                    </Box>
                </Form>
            </Box>
        </Box>
    );
}

export default Product;
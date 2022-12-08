import React, { useState } from 'react'
import { Button, InputBase, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Backdrop, Paper, Box, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { MultiSelect } from "react-multi-select-component";
import './style.css'
import { Uploader } from "uploader"; 
import { UploadButton } from "react-uploader";
import productData from './utlity.json'


const options = [
    { label: " laptop", value: "laptop" },
    { label: "harddisk", value: "harddisk" },
    { label: "ram", value: "Ram", },
    { label: "Graphics Card", value: "Graphics Card", },
];
const uploader = Uploader({
    apiKey: "free" 
});



const Home = () => {
    const [add, setAdd] = useState(false)
    const [search, setSearchValue] = useState('')
    const [selected, setSelected] = useState([]);
    const [file, setFile] = useState('')
    const [productName, setProductName] = useState('')
    const [productCode, setProductCode] = useState('')
    const [productDecp, setDescription] = useState('')



    const handleAdd = () => {
        setAdd(true)
    }
    const handleSubmit = () => {
        let prodCat;
        if (selected.length > 0) {
            prodCat = selected.map((data) => data.value)
            prodCat = prodCat.toString('');
            if (productName !== '' && productCode !== "" && file !== '') {
                productData.push({
                    'productName': `${productName}`, 'productCode': `${productCode}`,
                    'ProductCatagery': `${prodCat}`, 'productImage': `${file}`,
                    'productDecp': `${productDecp}`
                });


                alert("All field Saved sucessfully !!! ....")

                setAdd(false);

            } else {
                setAdd(false);
                alert("need value for all field")


            }
        }
        else {
            setAdd(false);

            alert("need value for all field")
        }
    }
    return (
        <div >
            <div id="home-content">

                <div id="searchbar">
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search product Name "
                        inputProps={{ 'aria-label': 'search Product Name' }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
                <div id="button">
                    <Button variant='primary' onClick={handleAdd} >Add Product</Button>
                </div>
            </div>
            <div id="table">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productData?.filter((data) => {
                                if (search === "") {
                                    return data
                                } else if (data.productName.toLowerCase().includes(search.toLowerCase())) {
                                    return data
                                }
                            }).map((value) => {
                                return <TableRow>
                                    <TableCell>{value.productName}</TableCell>
                                    <TableCell>{value.productCode}</TableCell>
                                    <TableCell>{value.ProductCatagery}</TableCell>
                                    <TableCell>{value.productImage}</TableCell>
                                    <TableCell>{value.productDecp}</TableCell>
                                </TableRow>
                            })}


                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div id="model">
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={add}
                // onClick={handleClose}
                >
                    <Paper elevation={3}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '65ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField id="standard-basic" label="Product Name" variant="standard" onChange={(e) => setProductName(e.target.value)} style={{ marginRight: "12%", marginLeft: '5%' }} />
                                <TextField id="standard-basic" label="Product Code" variant="standard" onChange={(e) => setProductCode(e.target.value)} />
                            </div>
                            <div id="second">
                                <div id="multi-select">
                                    <h6>Select Catagery:</h6>
                                    <MultiSelect
                                        options={options}
                                        value={selected}
                                        onChange={setSelected}
                                        label="SelectCatagery"
                                    />
                                </div>
                                <div >
                                    <UploadButton uploader={uploader}
                                        onComplete={files => setFile(files.map(x => x.fileUrl).join("\n"))}>
                                        {({ onClick }) =>
                                            <Button onClick={onClick} style={{ marginLeft: '28%', width: '12rem', top: '56%' }} >
                                                Upload a Image...
                                            </Button>
                                        }
                                    </UploadButton>
                                </div>
                            </div>
                            <div>
                                <TextField
                                    style={{ marginLeft: '5%', marginTop: '5%', width: '84%' }}
                                    id="standard-multiline-static"
                                    label="Description..."
                                    multiline
                                    rows={4}
                                    // defaultValue="Default Value"
                                    variant="standard"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '10%' }}>
                                <Button onClick={handleSubmit}> Save</Button>
                                <Button onClick={() => setAdd(false)}>cancel</Button>
                            </div>
                        </Box>

                    </Paper>




                </Backdrop>
            </div>

        </div>
    )
}

export default Home;
import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useStyles } from "./VehicleCss"
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { teal } from "@material-ui/core/colors";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';





export default function Vehicle() {
    var classes = useStyles()
    var navigate = useNavigate()



    const [modelList, setModelList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [companyList, setCompanyList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [companyId, setCompanyId] = useState('')
    const [modelId, setModelId] = useState('')
    const [vendorId, setVendorId] = useState('')
    const [registrationNo, setRegistrationNo] = useState('')
    const [color, setColor] = useState('')
    const [fuel, setFuel] = useState('')
    const [ratings, setRatings] = useState('')

    const [average, setAverage] = useState('')
    const [remark, setRemark] = useState('')
    const [capacity, setCapacity] = useState('')
    const [status, setStatus] = useState('')
    const [feature, setFeature] = useState('')
    const [originalPicture, setOriginalPicture] = useState({ filename: '/assets/HONDA.png', bytes: '' })



    ///// categoryDropDown start..........................//
    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }

    useEffect(function () {
        fetchAllCategory();
    }, [])

    const fillCategoryDropDown = () => {
        return categoryList.map((item) => {

            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)

        })

    }
    const handleChangeCategory = (event) => {
        setCategoryId(event.target.value)
        fetchAllSubcategoryByCategory(event.target.value)
    }

    ///categorydorpdown END.............//

    ///// start subcategory dropdown//////////////////////
    const fetchAllSubcategoryByCategory = async (category_id) => {
        var body = { categoryid: category_id }
        var response = await postData('subcategory/fetch_all_subcategory_by_category', body)
        setSubCategoryList(response.result)
    }
    const fillSubCategoryDropDown = () => {
        return subCategoryList.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>

            )

        })

    }

    const handleSubCategoryChange = (event) => {
        setSubCategoryId(event.target.value)
        fetchAllCompanyBySubCategory(event.target.value)

    }

    ////end.. subcategory///////////////////////


    const fetchAllCompanyBySubCategory = async (subcategory_id) => {
        var body = { subcategoryid: subcategory_id }
        var response = await postData('company/fetch_all_company_by_subcategory', body)
        setCompanyList(response.result)
    }

    const fillCompanyDropDown = () => {
        return companyList.map((item) => {
            return (<MenuItem value={item.companyid}>{item.companyname}</MenuItem>)
        })

    }


    const handleCompanyChange = (event) => {
        setCompanyId(event.target.value)
        fetchAllModelByCompany(event.target.value)

    }
    //////end company dropdown//////


    const fetchAllModelByCompany = async (company_id) => {
        var body = { companyid: company_id }
        var response = await postData('model_ctrl/fetch_all_model_by_company', body)
        setModelList(response.result)
    }

    const fillModelDropDown = () => {
        return modelList.map((item) => {
            return (<MenuItem value={item.modelid}>{item.modelname}</MenuItem>)
        })
    }

    const handleModelChange = (event) => {
        setModelId(event.target.value)

    }

    const handlestatusChange=(event)=>{
        setStatus(event.target.value)
        }
      

    const handleFuelChange = (event) => {
        setFuel(event.target.value)
    }

    const handleRatingsChange = (event) => {
        setRatings(event.target.value)
    }

    const handlePicture = (event) => {
        setOriginalPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }


    const resetValue = async () => {
        setCategoryId("")
        setSubCategoryId("")
        setCompanyId("")
        setModelId("")
        setVendorId("")
        setRegistrationNo("")
        setColor("")
        setFuel("")
        setRatings("")
        setAverage("")
        setRemark("")
        setCapacity("")
        setStatus("")
        setFeature("")

        setOriginalPicture({ filename: "/assets/HONDA.png", bytes: '' })

    }


    const handleSubmit = async () => {
        var formdata = new FormData()
        formdata.append("categoryid", categoryId)
        formdata.append("subcategoryid", subCategoryId)
        formdata.append("companyid", companyId)
        formdata.append("modelid", modelId)
        formdata.append("vendorid", vendorId)
        formdata.append("regisno", registrationNo)
        formdata.append("color", color)
        formdata.append("fuel", fuel)
        formdata.append("ratings", ratings)
        formdata.append("average", average)
        formdata.append("remarks", remark)
        formdata.append("capacity", capacity)
        formdata.append("status", status)
        formdata.append("features", feature)
        formdata.append("originalpicture", originalPicture.bytes)

        var result = await postData('vehicle/vehiclesubmit', formdata)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'vehicle Submited Successfully'

            })

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })

        }



    }


    const handleDisplayVehicle = () => {
        navigate('/dashboard/displayallvehicle')
    }


    return (


        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headingStyle}>
                        <div className={classes.center}>
                            <ListAltIcon onClick={handleDisplayVehicle} />
                            <div style={{ marginLeft: 8, fontSize: '24', fontWeight: 'bolder' }}>
                                Vehicle Interface
                            </div>
                        </div>


                    </Grid>
                    <Grid xs={6} item >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Select category"
                                onChange={handleChangeCategory}>

                                {fillCategoryDropDown()}

                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid xs={6} item >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategoryId}
                                label=" Select Subcategory"
                                onChange={handleSubCategoryChange}>

                                {fillSubCategoryDropDown()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={6} item >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={companyId}
                                label="Select Company"
                                onChange={handleCompanyChange}>

                                {fillCompanyDropDown()}

                            </Select>
                        </FormControl>

                    </Grid>


                    <Grid xs={6} item >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modelId}
                                label="Select MOdel"
                                onChange={handleModelChange}>

                                {fillModelDropDown()}

                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid xs={4} item>
                        <TextField value={vendorId} onChange={(event) => setVendorId(event.target.value)} fullWidth label='Vendor Id'></TextField>
                    </Grid>

                    <Grid xs={4} item>
                        <TextField value={registrationNo} onChange={(event) => setRegistrationNo(event.target.value)} fullWidth label='Registration No.'></TextField>
                    </Grid>

                    <Grid xs={4} item>
                        <TextField value={color} onChange={(event) => setColor(event.target.value)} fullWidth label='Colour'></TextField>
                    </Grid>


                    <Grid xs={4} item>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select-FuelType</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fuel}
                                    label=" Select-FuelType"
                                    onChange={handleFuelChange}
                                >
                                    <MenuItem value="diseal">Diesel</MenuItem>
                                    <MenuItem value="Petrol">Petrol</MenuItem>
                                    <MenuItem value="CNG">CNG</MenuItem>
                                    <MenuItem value="Electric">Electric</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </Grid>



                    <Grid xs={4} item>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select-Ratings</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ratings}
                                    label=" Select-Ratings"
                                    onChange={handleRatingsChange}
                                    
                                > 
                                  <MenuItem value={1}>1*</MenuItem>
                                 <MenuItem value={2}>2**</MenuItem>
                                      <MenuItem value={3}>3***</MenuItem>
                                    <MenuItem value={4}>4****</MenuItem>
                                    <MenuItem value={5}>5******</MenuItem>
                                  
                                </Select>
                            </FormControl>
                        </Box>

                    </Grid>


                    <Grid xs={4} item>
                        <TextField  value={average} onChange={(event) => setAverage(event.target.value)} fullWidth label='Average'></TextField>
                    </Grid>


                    <Grid xs={6} item>
                        <TextField  value={remark}  onChange={(event) => setRemark(event.target.value)} fullWidth label='Remarks'></TextField>
                    </Grid>

                    <Grid xs={6} item>
                        <TextField   value={capacity} onChange={(event) => setCapacity(event.target.value)} fullWidth label='Capacity'></TextField>
                    </Grid>

                    <Grid item xs={6}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={status}
                   onChange={handlestatusChange}
                   >
                  <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
                  <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
                  </RadioGroup>
                  </FormControl>
                </Grid>



                    <Grid xs={6} item>
                        <TextField  value={feature} onChange={(event) => setFeature(event.target.value)} fullWidth label='Features'></TextField>
                    </Grid>

                    <Grid xs={6} item>
                        <Button fullWidth variant="contained" component="label">
                            Upload Original Picture
                            <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
                        </Button>

                    </Grid>

                    <Grid xs={6} item className={classes.center}>
                        <Avatar
                            alt="Vehicle Picture"
                            src={originalPicture.filename}
                            variant="rounded"
                            sx={{ width: 120, height: 56 }}
                        />


                    </Grid>

                    <Grid xs={6} item >
                        <Button onClick={handleSubmit} fullWidth variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>


                    <Grid xs={6} item >
                        <Button onClick={resetValue} fullWidth variant="contained" color="primary">
                            Reset
                        </Button>
                    </Grid>













                </Grid>
            </div>
        </div>




    )

}
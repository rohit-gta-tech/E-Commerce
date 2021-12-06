import React, { Fragment, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import './MyOrders.css'
import { useSelector, useDispatch } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderAction'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import{ useAlert } from 'react-alert'
import Typography from '@material-ui/core/Typography'
import MetaData from '../layout/MetaData'
import LaunchIcon from '@material-ui/icons/Launch'
 
const MyOrders = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, orders } = useSelector((state) => state.myOrders)
    const { user } = useSelector((state) => state.user)

    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 250, flex: 0.8},
        { field: 'status', headerName: 'Status', minWidth: 100, flex: 0.4, cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
        }},
        { field: 'itemsQty', headerName: 'Items Qty', type: 'number', minWidth: 150, flex: 0.3},
        { field: 'amount', headerName: 'Amount', type: 'number', minWidth: 270, flex: 0.5},
        { field: 'actions', headerName: 'Actions', type: 'number', minWidth: 150, flex: 0.3, sortable: false, renderCell: (params) => {
            return (
                <Link to={`/order/${params.getValue(params.id, 'id')}`}>
                    <LaunchIcon />
                </Link>
            )
        }}
    ]
    const rows = []

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [alert, error, dispatch])
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Orders'`}/>
                    <div className="myOrdersPage">
                        <DataGrid 
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className='myOrdersTable'
                            autoHeight
                        />

                        <Typography id='myOrdersHeading'>{user.name}'s Orders</Typography>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default MyOrders

import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Button, Snackbar } from "@mui/material";
import InputMask from 'react-input-mask'
import NumberFormat from 'react-number-format';
import { insertAlert } from "services/http";
import {  useFormik } from "formik";
import * as yup from 'yup'
import socketIOClient, { Socket } from "socket.io-client";

var socketGlobal: Socket = socketIOClient(process.env.ENDPOINT as string, {
  transports: ["websocket"],
});


// import { Container } from './styles';
interface ICard {
  symbol: string;
  price: string;
  img_first: string;
  digits: number
}

interface ISymbol {
  id: number;
  symbol: string;
  price: number;
  digits: number;
  description: string;
  img_first: string;
  img_second: string;
}

const Card: React.FC<ICard> = ({ symbol, img_first, digits }: ICard) => {
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [symbolCard, setSymbolCard] = React.useState<ISymbol>({
    id: 0,
    symbol: '',
    price: 0.000,
    digits: 0,
    description: '',
    img_first: '',
    img_second: '',
  })

  const formik = useFormik({
    initialValues: {
      price: 0,
      message: "",
      phone_number: "",
    },
    validationSchema: yup.object({
      message: yup.string().required("Esse campo é obrigatorio").min(10, "Prencher até 10 caracteres"),
      phone_number: yup.string().required("Esse campo é obrigatorio").min(10, "Prencher até 9 caracteres"),
      price: yup.number().required("Esse campo é obrigatorio")
    }),
    onSubmit: () => {     
      handleClose()
      insertAlert({
        ...formik.values,
        direction: symbolCard.price >= formik.values.price ? "down" : "up",
        symbol: symbolCard.symbol,
        email: 'eriton.gomes.souza@gmail.com',
        phone_number: formik.values.phone_number,
        message: formik.values.message,
        active: 1
      }).then(() => {
          setOpenSuccess(true)
          setTimeout(() => {
          setOpenSuccess(false) 
          }, 2000)
      }).catch((_err) => {
          setOpenError(true)
          setTimeout(() => {
          setOpenError(false) 
          }, 2000) 
      })
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      console.log('Component desmontado')
      socketGlobal.removeListener(symbol)
    }
  }, [])

  useEffect(() => {
    //setSymbolCard(prev => ({ ...prev, price: Number(price) }))
    socketGlobal.on(symbol, observableMt5)
    setTimeout(() => {
    formik.setFieldValue('phone_number', '+5511960655281')
    }, 1000);
  }, [])

  const observableMt5 = (data: any) => {
    //setSymbolCard(data) 
    setSymbolCard(prev => ({ ...prev, price: data }))
    console.log(data)
  }

  return (
    <>
      <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'top'}} message="Alterado com sucesso"  open={openSuccess} autoHideDuration={6000} />
      <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'top'}} message="Erro ao realizar alteração" open={openError} autoHideDuration={6000} />

      <Dialog
        open={open}
        hideBackdrop={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create alert on <span className="font-bold text-purple-600">{symbol}</span>
        </DialogTitle>
        <DialogContent>
          <div style={{
            width: "500px"
          }}>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-900"
              >
                Price: {symbolCard.price.toFixed(digits)}
              </label>
              <NumberFormat
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="price"
                id="price"
                value={formik.values.price}
                decimalScale={digits}
                className="p-2.5 w-full text-sm outline-none border text-gray-900 bg-gray-50 rounded-lg  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden">
                <span className="font-medium">Error!</span> Username
                available!
              </p>
            </div>
            <div className="w-md">
              <label
                htmlFor="username-error"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone number (Whatsapp)
              </label>
              <InputMask
                id="phone_number"
                name="phone_number"
                mask="+99999999999999"
                value={formik.values.phone_number}
                maskChar={null}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {(props) => {
                  return (<input
                    {...props}
                    type="text"
                    id="username-error"
                    className="p-2.5 w-full text-sm outline-none border text-gray-900 bg-gray-50 rounded-lg  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter phone number..."
                  />)
                }}
              </InputMask>

              <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden">
                <span className="font-medium">Oops!</span> Username already
                taken!
              </p>

              <label htmlFor="message" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-400 mt-6">Your message</label>
              <textarea 
              value={formik.values.message} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              id="message" 
              name="message" rows={4} 
              className="block outline-none resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a custom message..."
              ></textarea>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!formik.isValid} onClick={() => formik.handleSubmit()} >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div className="flex flex-col px-2 pb-2 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <div className="w-full flex flex-row justify-end px-2 mt-1">
          <div className="hidden cursor-pointer">
            <svg
              className="fill-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="20px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z" />
            </svg>
          </div>
          <div onClick={handleClickOpen} className="cursor-pointer">
            <svg
              className="fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="20px"
            >
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </div>
          <div className="cursor-pointer">
            <svg
              className="fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
            <img className="w-10 h-10 rounded-full" alt="" src={img_first} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {symbol}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {symbolCard.price.toFixed(digits)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

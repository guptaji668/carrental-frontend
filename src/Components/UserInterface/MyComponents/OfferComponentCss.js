import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
        width: "97%",
    },

    heading: {
        color:'#fff',fontWeight:"bolder",fontSize:28
    },

    wrapper: {
        position: "relative",
        borderRadius: "16px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 2px 0 rgb(0 0 0 / 7%)",
        width: 280,
        height: 104,
        margin:"auto",
    },

    iconSpan: {
        display: "inline-block",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        height: 100,
        width: 100,
        left: "20px",
    },

    icon: {
        height: "100%",
        width: "100%",
        objectFit: "contain",
    },

    cardHeading: {
        fontFamily: "Poppins",
        fontStretch: "normal",
        fontStyle: "normal",
        letterSpacing: "normal",
        margin: 0,
        fontWeight: 600,
        position: "relative",
        left:130,
        top: 18,
    },

    cardDesc: {
        fontFamily: "Poppins",
        fontStretch: "normal",
        fontStyle: "normal",
        letterSpacing: "normal",
        margin: 0,
        fontWeight: 400,
        position: "absolute",
        left: 120,
        top: 42,
        color: "rgba(18,34,50,.7)",
        right: 4,
    },

    subContainer: {
        display: "flex",
        justifyContent: "space-between",
    },

    iconContainer: {
        marginTop: "6px",
    },

    mainArrow: {
        cursor: "pointer",
    }
});

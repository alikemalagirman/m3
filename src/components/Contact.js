import React, {useState} from "react";
import axios from "axios"
import {makeStyles,useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonArrow from "./ui/ButtonArrow"
import {Link} from "react-router-dom"
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent"

import background from "../assets/background.jpg"
import mobileBackground from "../assets/mobileBackground.jpg"
import phoneIcon from "../assets/phone.svg"
import emailIcon from "../assets/email.svg"
import airplane from "../assets/send.svg";






const useStyles = makeStyles(theme=>({
    background:{
        backgroundImage:`url(${background})`,
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        height:"60em",
        paddingBottom:"10em",
        [theme.breakpoints.down("md")]:{
            backgroundImage:`url(${mobileBackground})`
        }

    },
    estimateButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        height:50,
        width:205,
        backgroundColor:theme.palette.common.orange,
        fontSize:"1.5rem",
        marginRight:"5em",
        marginLeft:"2em",
        [theme.breakpoints.down("md")]:{
            marginLeft:0,
            marginRight:0
        },
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        }
    },
    learnButton:{
        ...theme.typography.learnButton,
        fontSize:"0.7rem",
        height:35,
        padding:5,
        [theme.breakpoints.down("md")]:{
            marginBottom:"2em"
        }
    },
    message:{
        border:`2px solid ${theme.palette.common.blue}`,
        marginTop:"5em",
        borderRadius:5,

        
    },
    sendButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        height:45,
        width:245,
        fontSize:"1rem",
        backgroundColor:theme.palette.common.orange,
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]:{
            height:40,
            width:225
        }

        
    }


}));

export default function Contact(props){

    const classes =useStyles();
    const theme=useTheme();
    const [name,setName]=useState("");
    
    const [email,setEmail]=useState("");
    const [emailHelper, setEmailHelper]=useState("");
    const [phone,setPhone]=useState("");
    const [phoneHelper, setPhoneHelper]=useState("");
    const [message,setMessage]=useState("");

    const [open,setOpen] = useState(false)


    const onChange = event => {
        let valid;
        switch (event.target.id) {
            case "email":
                setEmail(event.target.value)
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
                if(!valid){
                    setEmailHelper("Invalid email")
                } else {
                    setEmailHelper("")
                }
                break;
            
            case "phone" :
                setPhone(event.target.value)
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value)

                if(!valid){
                    setPhoneHelper("Invalid phone")
                } else {
                    setPhoneHelper("")
                }
                break;


            default:
                break;
        }
    }
   


    const matchesMD= useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM= useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS= useMediaQuery(theme.breakpoints.down("xs"));

    const onConfirm = () => {   
        axios.get("https://us-central1-material-ui-course-efc24.cloudfunctions.net/sendMail")
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    

    return (
        <Grid container direction="row">
            <Grid item container direction="column" 
                style={{marginBottom:matchesMD?"5em":0, marginTop: matchesSM?"1em": matchesMD?"5em":0}}
                justify="center" alignItems="center" lg={4} xl={3}>
                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography align={matchesMD?"center":undefined} variant ="h2" style={{lineHeight:1}}>
                                Contact Us
                            </Typography>
                            <Typography variant ="body1" align={matchesMD?"center":undefined} 
                                style={{color:theme.palette.common.blue}}>
                                We are waiting.
                            </Typography>
                        </Grid>

                        <Grid item container style={{marginTop:"2em"}}>
                            <Grid item>
                                <img src={phoneIcon} alt="phone" style={{marginRight:"0.5em"}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant ="body1" style={{color:theme.palette.common.blue, fontSize:"1rem"}}>
                                    <a href="tel:(555) 555-5555" 
                                        style={{textDecoration:"none", color:"inherit"}}>
                                        (555) 555-5555
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container style={{marginBottom:"2em"}}>
                            <Grid item>
                                <img src={emailIcon} alt="envelope" style={{marginRight:"0.5em", verticalAlign:"bottom"}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant ="body1" style={{color:theme.palette.common.blue,fontSize:"1rem"}}>
                                    <a href="mailto:zachary@gmail.com" 
                                    style={{textDecoration:"none", color:"inherit"}}>
                                    zachary@gmail.com
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction ="column" style={{maxWidth:"20em"}}>
                            <Grid item style={{marginBottom:"0.5em"}}>
                                <TextField fullWidth label="Name" id="name" value={name}
                                    onChange={(event)=>setName(event.target.value)} />
                            </Grid>
                            <Grid item style={{marginBottom:"0.5em"}}>
                                <TextField fullWidth label="Email" id="email" value={email}
                                    onChange={onChange} error={emailHelper.length!==0} helperText={emailHelper} />
                            </Grid>
                            <Grid item style={{marginBottom:"0.5em"}}>
                                <TextField  fullWidth label="Phone" id="phone" value={phone}
                                    onChange={onChange} error={phoneHelper.length!==0}  helperText={phoneHelper}/>
                            </Grid>
                            <Grid item style={{maxWidth:"20em"}} >
                                <TextField fullWidth value={message} id="message" onChange={(event)=>setMessage(event.target.value)}
                                 multiline rows={10} className={classes.message} InputProps={{disableUnderline:true}}/>
                            </Grid>
                        </Grid>
                        
                        <Grid item container justify="center" style={{marginTop:"2em"}} >
                            <Button variant="contained" className={classes.sendButton}
                                //disabled={name.length===0 || message.length ===0 || email.length===0 || phone.length===0
                                //||phoneHelper===0||emailHelper===0} 
                                onClick={()=>setOpen(true)}>
                                Send Mesage
                                <img src={airplane} alt="paper airplane" style={{marginLeft:"1em"}} />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={()=>setOpen(false)}
                PaperProps={{style:{
                    paddingTop:matchesXS?"1em":"5em",
                    paddingBottom:matchesXS?"1em":"5em", 
                    paddingLeft:matchesXS?0:matchesSM?"5em":matchesMD?"10em":"20em",
                    paddingRight:matchesXS?0:matchesSM?"5em":matchesMD?"10em":"20em"}}}
                style={{zIndex:1302}} 
                fullScreen={matchesXS} 
                >
                <DialogContent>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h4" gutterBottom align="center">Confirm Message</Typography>
                        </Grid>
                        
                        <Grid item style={{marginBottom:"0.5em"}}>
                            <TextField fullWidth label="Name" id="name" value={name}
                                onChange={(event)=>setName(event.target.value)} />
                        </Grid>
                        <Grid item style={{marginBottom:"0.5em"}}>
                            <TextField fullWidth label="Email" id="email" value={email}
                                onChange={onChange} error={emailHelper.length!==0} helperText={emailHelper} />
                        </Grid>
                        <Grid item style={{marginBottom:"0.5em"}}>
                            <TextField  fullWidth label="Phone" id="phone" value={phone}
                                onChange={onChange} error={phoneHelper.length!==0}  helperText={phoneHelper}/>
                        </Grid>
                        <Grid item style={{maxWidth:matchesXS?"100%":"20em"}} >
                            <TextField fullWidth value={message} id="message" onChange={(event)=>setMessage(event.target.value)}
                                multiline rows={10} className={classes.message} InputProps={{disableUnderline:true}}/>
                        </Grid>
                        <Grid item container style={{marginTop:"2em"}} alignItems="center"
                            direction={matchesSM?"column":"row"}>
                            <Grid item>
                                <Button 
                                    color="primary" onClick={()=>setOpen(false)}
                                    style={{fontWeight:300}}>
                                        Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" className={classes.sendButton}
                                    //disabled={name.length===0 || message.length ===0 || email.length===0 || phone.length===0
                                    //||phoneHelper===0||emailHelper===0} 
                                    onClick={onConfirm}>
                                    Send Mesage
                                    <img src={airplane} alt="paper airplane" style={{marginLeft:"1em"}} />
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>
                </DialogContent>


            </Dialog>

            <Grid item container direction={matchesMD?"column":"row"}
                className={classes.background} lg={8} xl={9} alignItems="center" 
                justify={matchesMD?"center":undefined}
            >
              <Grid
                  item
                  style={{
                      marginLeft:matchesMD?0:"3em",
                      textAlign:matchesMD?"center":"inherit"
                  }}>
                  <Grid container direction="column">
                      <Typography align={matchesMD?"center":undefined} variant ="h2">
                          Simple Software.
                          <br/>
                          Revolutinary results.
                      </Typography>
                      <Typography align={matchesMD?"center":undefined} variant="subtitle2" style={{fontSize:"1.5rem"}}>
                          Take advantage of 21st Century
                      </Typography>
                      <Grid
                          container
                          item
                          justify={matchesMD?"center":"undefined"}>
                          <Button
                              variant="outlined"
                              className={classes.learnButton}
                              component ={Link} to ="/revolution"
                              onClick={()=>props.setValue(2)}>
                              <span style={{marginRight:5}}> Learn More </span>
                              <ButtonArrow width={10} height={10}
                                  fill={theme.palette.common.blue}/>
                          </Button>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid item >
                  <Button
                      variant = "contained"
                      className={classes.estimateButton}
                      component ={Link} to ="/estimate"
                      onClick={()=>props.setValue(5)}>
                      Free Estimate
                  </Button>
              </Grid>
            </Grid>
        </Grid>
    )

}

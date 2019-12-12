
// ----------> CSS KODALRIMIZ <-------------

export default {
    palette: {
        primary: {
            light: '#58a9cf',
            main: '#197a9e',
            dark: '#004e6f',
            contrastText: '#ffffff',
        }
    },
    typography: {
        useNextVariants: true
    },
    styleExport: {
        form: {
            textAlign: 'center'
        },
        image: {
            margin: "20px auto 20px auto"
        },
        pageTitle: {
            margin: "30px auto 10px auto"
        },
        textField: {
            margin: "10px auto 10px auto"
        },
        textField2: {
            margin: "10px auto 50px auto"
        },
        customError: {
            color: "#FF0000",
            fontSize: "0.8rem",
            marginBottom: "10px"

        },
        progress: {
            position: 'absolute'
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        }
    }

};

import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket'

const router = Router();



router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const server = Server.instance;
    const payload = {
            de,
            cuerpo
        }

    server.io.emit(id).emit( 'mensaje-privado',payload )
    

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});

// Servicio para obtener Ids Usuarios
router.get('/usuarios/', ( req : Request, res : Response)=>{
    const server = Server.instance;
    server.io.clients((err: any, clientes : string[])=>{
        if(err){
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    })
})

// Obtener usuarios y sus nombres 
router.get('/usuarios/detalle',(req: Request, res: Response)=>{
    usuariosConectados
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
})

export default router;



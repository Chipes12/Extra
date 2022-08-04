const fs = require("fs");
const jspdf = require("jspdf");
const { parseString, Builder } = require("xml2js");
let path = "./example.xml";

const xmlText = fs.readFileSync(path).toString();

parseString(xmlText, (err, data) => {
    let objeto = {
        folio: data["cfdi:Comprobante"].$.Folio,
        fecha: data["cfdi:Comprobante"].$.Fecha,
        total: data["cfdi:Comprobante"].$.Total,
        rfcCliente: data["cfdi:Comprobante"]["cfdi:Receptor"][0].$.Rfc,
        cliente: data["cfdi:Comprobante"]["cfdi:Receptor"][0].$.Nombre,
        conceptos: []
    }

    data["cfdi:Comprobante"]["cfdi:Conceptos"][0]["cfdi:Concepto"].forEach( concepto => {
        let detail = {
            cantidad: concepto.$.Cantidad,
            unidad: concepto.$.Unidad,
            descripcion: concepto.$.Descripcion
        };
        objeto.conceptos.push(detail);
    });
    
})

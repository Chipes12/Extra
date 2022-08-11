const fs = require("fs");
const XLSX = require("xlsx");
const {
    parseString
} = require("xml2js");
const PATH = require("path")

function xmlToExcel() {
    let file = document.getElementById('file-to-upload').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        parseString(reader.result, (err, data) => {
            let factura = {
                folio: data["cfdi:Comprobante"].$.Folio,
                fecha: data["cfdi:Comprobante"].$.Fecha,
                total: data["cfdi:Comprobante"].$.Total,
                rfcCliente: data["cfdi:Comprobante"]["cfdi:Receptor"][0].$.Rfc,
                cliente: data["cfdi:Comprobante"]["cfdi:Receptor"][0].$.Nombre,
            }
            let conceptos = [];
            let facturas = [];
            data["cfdi:Comprobante"]["cfdi:Conceptos"][0]["cfdi:Concepto"].forEach(concepto => {
                let detail = {
                    cantidad: concepto.$.Cantidad,
                    unidad: concepto.$.Unidad,
                    descripcion: concepto.$.Descripcion,
                    importe: concepto.$.Importe,
                };
                conceptos.push(detail);
            });
            conceptos.forEach((c, index) => {
                facturas[index] = {}
                facturas[index].folio = factura.folio;
                facturas[index].fecha = factura.fecha;
                facturas[index].rfcCliente = factura.rfcCliente;
                facturas[index].cliente = factura.cliente;
                facturas[index].total = factura.total;
                facturas[index].concepto = c.descripcion;
                facturas[index].unidad = c.unidad;
                facturas[index].cantidad = c.cantidad;
                facturas[index].importe = c.importe;
            });
    
            let wb = XLSX.utils.book_new();
            wb.Props = {
                Title: `${factura.folio}`,
            };
            let ws = XLSX.utils.json_to_sheet(facturas);
            XLSX.utils.book_append_sheet(wb, ws, "Datos");
    
            let nameFile = factura.folio;
            if (fs.existsSync(`${nameFile}.xlsx`)) {
                let counter = 1;
                nameFile = `${factura.folio}-${counter}`
                while (fs.existsSync(`${nameFile}.xlsx`)) {
                    counter++;
                    nameFile = `${factura.folio}-${counter}`;
                }
            }
            let directory = document.getElementById("path");
            if(directory.files[0].path){
                let dir = directory.files[0].path;
                XLSX.writeFile(wb, PATH.join(PATH.dirname(dir), `${nameFile}.xlsx`));
            } else{
                XLSX.writeFile(wb, `${nameFile}.xlsx`);
            }
        });
      }
}

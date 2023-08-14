<template>
    <v-row justify="center">
        <v-dialog v-model="verDialogTicket" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark theme="dark" class="noImprimir">
                    <v-btn icon dark @click="cerrarDialogo()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="imprimir()">
                            Imprimir
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-col cols="4" sm="6" md="4" xl="4" class="ma-auto">
                        <v-card rounded="4" class="pa-4 mt-2" id="ticket">
                            <v-row class="w-100 flex-column" id="infoEmpresa" no-gutters
                                style="font-family: 'Roboto', sans-serif; color: #000 !important; margin-top:5px;">
                                <p
                                    style="text-align: center !important; font-weight: bold !important; text-transform: uppercase !important;">
                                    EMPRESA X</p>
                                <p style="text-align: center !important;">Calle 3 #30-46 Barrio el mora</p>
                                <p style="text-align: center !important;">Montería, Córdoba, Colombia</p>
                            </v-row>
                            <v-row class="w-100 flex-column" no-gutters id="datosGenerales">
                                <v-row class="w-100 flex-column" no-gutters
                                    style="font-family: 'Roboto', sans-serif; color: #000 !important; font-weight: 500 !important;">
                                    <p style=" font-size: 1.2rem;">TICKET: <span>123</span></p>
                                    <p style=" font-size: 1.2rem;">FECHA: <span>09-08-2023</span></p>
                                    <p style=" font-size: 1.2rem;">CLIENTE: <span>01</span></p>
                                </v-row>
                                <v-divider class="divider-dotted"
                                    style="border-style: dotted !important; color: #000; opacity: 1;"></v-divider>
                                <v-row class="w-100 flex-column" no-gutters>
                                    <v-table id="tablaTicket" class="w-100" fixed-header height="auto" border="1"
                                        border-collapse="collapse" cellspacing="0">
                                        <thead class="fw-bold" style="font-weight: bold; font-size: 1.3rem;">
                                            <tr style="color: #000;">
                                                <th class="text-left"
                                                    style="font-size: 1.20rem; color: #000; border-bottom-style: dotted !important; border-bottom-width: 1px !important; box-shadow: none !important;">
                                                    Cant
                                                </th>
                                                <th class="text-left"
                                                    style="font-size: 1.20rem; color: #000; border-bottom-style: dotted !important; border-bottom-width: 1px !important; box-shadow: none !important;">
                                                    Descripción
                                                </th>
                                                <th class="text-left"
                                                    style="font-size: 1.20rem; color: #000; border-bottom-style: dotted !important; border-bottom-width: 1px !important; box-shadow: none !important;">
                                                    P.U
                                                </th>
                                                <th class="text-left"
                                                    style="font-size: 1.20rem; color: #000; border-bottom-style: dotted !important; border-bottom-width: 1px !important; box-shadow: none !important;">
                                                    Pagar
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="productosTicket">
                                            <tr v-for="(item, index) in compras" :key="index">
                                                <td class="text-left"
                                                    style="font-size: 1.20rem; border-style: none !important;">{{
                                                        item.cantidad }}</td>
                                                <td class="text-left"
                                                    style="font-size: 1.20rem; max-width: 60px !important; border-style: none !important;">
                                                    {{ item.descripcion }}</td>
                                                <td class="text-left"
                                                    style="font-size: 1.20rem; border-style: none !important;">{{
                                                        item.precioU }}</td>
                                                <td class="text-left"
                                                    style="font-size: 1.20rem; border-style: none !important;">{{
                                                        item.cantidad * item.precioU }}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="4"
                                                    style="border-top:1px dotted #000; border-bottom: 1px dotted rgb(0,0,0);">
                                                    <p style="font-weight: bold; text-align: right;">VALOR VENTA: $<span>{{
                                                        valorVenta() }}</span></p>
                                                    <p style="font-weight: bold; text-align: right;">IVA: $<span>{{ iva
                                                    }}</span></p>
                                                    <p style="font-weight: bold; text-align: right;">PROPINA: $<span>{{
                                                        propina }}</span></p>
                                                    <p style="font-weight: bold; text-align: right; font-size: 1.3rem;">
                                                        TOTAL: $<span>{{ totalPagar() }}</span></p>
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </v-table>
                                </v-row>
                                <v-row class="w-100 flex-column" no-gutters id="infoVendedores"
                                    style="font-family: 'Roboto', sans-serif;">
                                    <p>MESERO: <span>Pepito Pérez</span></p>
                                    <p>CAJERO: <span>Brayan García</span></p>
                                    <v-divider class="divider-dotted"
                                        style="border-style: dotted !important; color: #000; opacity: 1;"></v-divider>
                                </v-row>
                                <v-row no-gutters class="w-100 flex-column" id="terminos">
                                    <p style="text-transform: uppercase; margin-top: 6px;">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero beatae maiores
                                        excepturi laborum sed sunt accusamus quaerat, quibusdam consequatur laudantium
                                        asperiores cupiditate tempore aperiam cumque, ea voluptatum amet perspiciatis
                                        dolores?
                                    </p>
                                    <p style="margin-top: 14px; text-align: center; font-weight: bold; text-transform: uppercase;"
                                        id="agradecimiento">*** Gracias por su compra ***</p>
                                </v-row>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import {
    jsPDF
} from "jspdf";
import "jspdf-autotable";
export default {
    name: 'ticketComponent',
    props: { dialog: { type: Boolean, default: false, required: true } },
    data: () => ({
        verDialogTicket: false,
        propina: 20000,
        iva: 10000,
        compras: [
            {
                cantidad: 2,
                descripcion: "Arroz de grano largo, 1kg.",
                precioU: 1800,
                pagar: 0,//cantidad*precioU
            }, {
                cantidad: 2,
                descripcion: "Arroz de grano largo, 1kg.",
                precioU: 1800,
                pagar: 0,//cantidad*precioU
            }, {
                cantidad: 2,
                descripcion: "Arroz de grano largo, 1kg.",
                precioU: 1800,
                pagar: 0,//cantidad*precioU
            }, {
                cantidad: 2,
                descripcion: "Arroz de grano largo, 1kg.",
                precioU: 1800,
                pagar: 0,//cantidad*precioU
            }, {
                cantidad: 2,
                descripcion: "Arroz de grano largo, 1kg.",
                precioU: 1800,
                pagar: 0,//cantidad*precioU
            },
        ]

    }),
    methods: {
        cerrarDialogo() {
            this.$emit('cerrarDialogoTicket');
        },
        imprimir() {
            const doc = new jsPDF('p', 'px', 'letter');
            doc.viewerPreferences({
                'HideWindowUI': true,
                'PrintArea': 'CropBox',
                'HideMenubar': true,
                'HideToolbar': true,
                'ViewArea': 'CropBox',
                'DisplayDocTitle': true
            });
            const infoEmpresa = document.getElementById('infoEmpresa');
            const datosGenerales = document.getElementById('datosGenerales');
            const margin = 6;
            const scale = (doc.internal.pageSize.width - margin * 2) / document.body.clientWidth;
            //const scale_mobile = (doc.internal.pageSize.width - margin * 2) / document.body.getBoundingClientRect();
            doc.setDocumentProperties({
                title: 'ticket.pdf'
            });

            //Revisar dispositivo
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                //Mobile
                doc.html(infoEmpresa, {
                    x: margin,
                    y: margin,
                    //width: 1320,
                    //height: 200,
                    //windowHeight: 200,
                    //windowWidth: 1320,
                    /* html2canvas: {
                        scale: scale_mobile,
                        //height: 200,
                        //width: 1320,
                        //windowWidth: 1320,
                        //windowHeight: 200,
                    }, */
                    filename: 'ticket.pdf',
                    callback: (pdf) => {
                        /*  pdf.autoTable({
                             html: tabla,
                             head: [['Producto', 'Descripcion', 'Precio', 'Descuento']],
                             useCss: true,
                             startY: 150,
                             styles: { overflow: 'ellipsize', cellWidth: 'wrap' },
                             // Override the default above for the text column
                             columnStyles: { text: { cellWidth: 'auto' } },
                             margin: { left: margin },
                             bodyStyles: { textColor: '#00000' },
                             headStyles: {
                                 fillColor: '#F3F2F7',
                                 textColor: '#00000',
                                 fontStyle: '"Roboto" sans-serif',
                                 lineWidth: {
                                     bottom: 1
                                 }
                             },
                         });
                         finalY = pdf.lastAutoTable.finalY; */
                        pdf.html(datosGenerales, {
                            x: margin,
                            y: 40,
                            /*  width: 1320,
                             windowWidth: 1320, */
                            /* html2canvas: {
                                scale: scale_mobile,
                                //height: 200,
                                // width: 1320,
                                // windowWidth: 1320,
                                //windowHeight: 200,
                            }, */
                            filename: 'ticket.pdf',
                            callback: (newPdf) => {
                                newPdf.autoPrint();
                                newPdf.output('dataurlnewwindow', { filename: 'ticket.pdf' });
                                /*  newPdf.html(parteFinal, {
                                     x: margin,
                                     y: finalY + 80,
                                     width: 1320,
                                     windowWidth: 1320,
                                     html2canvas: {
                                         scale: scale_mobile,
                                         //height: 200,
                                         width: 1320,
                                         windowWidth: 1320,
                                         //windowHeight: 200,
                                     },
                                     filename: 'factura.pdf',
                                     callback: (newPdf2) => {
                                         newPdf2.autoPrint();
                                         newPdf2.output('dataurlnewwindow', {
                                             filename: 'factura.pdf'
                                         });
                                         return newPdf2;
                                     }
                                 });
                              */
                            }
                        });
                    },
                });

            } else {
                //PC
                doc.html(infoEmpresa, {
                    x: margin,
                    y: margin,
                    //width: 1320,
                    //height: 200,
                    //windowHeight: 200,
                    //windowWidth: 1320,
                    html2canvas: {
                        scale: scale,
                        //height: 200,
                        //width: 1320,
                        //windowWidth: 1320,
                        //windowHeight: 200,
                    },
                    filename: 'ticket.pdf',
                    callback: (pdf) => {
                        pdf.html(datosGenerales, {
                            x: margin,
                            y: 40,
                            /*  width: 1320,
                             windowWidth: 1320, */
                            html2canvas: {
                                scale: scale,
                                //height: 200,
                                /*  width: 1320,
                                 windowWidth: 1320, */
                                //windowHeight: 200,
                            },
                            filename: 'ticket.pdf',
                            callback: (newPdf) => {
                                newPdf.autoPrint();
                                newPdf.output('dataurlnewwindow', { filename: 'ticket.pdf' });
                            }
                        });

                        /* pdf.autoTable({
                            html: tabla,
                            head: [['Producto', 'Descripcion', 'Precio', 'Descuento']],
                            useCss: true,
                            startY: 150,
                            styles: { overflow: 'ellipsize', cellWidth: 'wrap' },
                            // Override the default above for the text column
                            columnStyles: { text: { cellWidth: 'auto' } },
                            margin: { left: margin },
                            bodyStyles: { textColor: '#00000' },
                            headStyles: {
                                fillColor: '#F3F2F7',
                                textColor: '#00000',
                                fontStyle: '"Roboto" sans-serif',
                                lineWidth: {
                                    bottom: 1
                                }
                            },
                        });
                        finalY = pdf.lastAutoTable.finalY;
                        pdf.html(parte3, {
                            x: margin,
                            y: finalY + 20,
                            width: 1320,
                            windowWidth: 1320,
                            html2canvas: {
                                scale: scale,
                                //height: 200,
                                width: 1320,
                                windowWidth: 1320,
                                //windowHeight: 200,
                            },
                            filename: 'factura.pdf',
                            callback: (newPdf) => {
                                newPdf.html(parteFinal, {
                                    x: margin,
                                    y: finalY + 80,
                                    width: 1320,
                                    windowWidth: 1320,
                                    html2canvas: {
                                        scale: scale,
                                        //height: 200,
                                        width: 1320,
                                        windowWidth: 1320,
                                        //windowHeight: 200,
                                    },
                                    filename: 'factura.pdf',
                                    callback: (newPdf2) => {
                                        newPdf2.autoPrint();
                                        newPdf2.output('dataurlnewwindow', {
                                            filename: 'factura.pdf'
                                        });
                                        return newPdf2;
                                    }
                                });
                            }
                        }); */
                    },
                });
            }
        },
        valorVenta() {
            let venta = 0;
            this.compras.forEach((compraObj) => {
                venta += compraObj.cantidad * compraObj.precioU;
            });
            return venta;
        },
        totalPagar() {
            let pagar = 0;
            this.compras.forEach((compraObj) => {
                pagar += compraObj.cantidad * compraObj.precioU;
            });
            pagar += (this.iva + this.propina);
            return pagar;
        }
    },
    watch: {
        dialog() {
            console.log('Cambio');
            this.verDialogTicket = this.$props.dialog;
        }
    },

}
</script>
<style>
@media print {
    .noImprimir {
        display: none !important;
    }
}
</style>
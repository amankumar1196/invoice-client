import "../../components/modal/Modal.css";

function PDFInvoicePreviewTemplate() {
  let globalFormValues = JSON.parse(localStorage.getItem("invoiceValues")) || null;

  if(!globalFormValues){
    globalFormValues ={
      company: {},
      client: {},
      invoiceItems: {},
    }
  }

  return (
    <div class="pdf-generate">
      <div class="modal-body p-0">
        <div class="preview-section-wrapper">
          <div class="preview-content">
            <div class="company-details-wrapper-header">
            { globalFormValues.company.logo ?
              <div class="company-logo">
                {/* <svg width="80" height="27" viewBox="0 0 131 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.132 0.512V6.164H14.256V26H7.2V6.164H0.396V0.512H21.132ZM39.5516 21.752H30.5156L29.1116 26H21.6596L30.9836 0.619998H39.1556L48.4436 26H40.9556L39.5516 21.752ZM37.7876 16.424L35.0516 8.144L32.2796 16.424H37.7876ZM69.5379 18.656C69.5379 20.072 69.1779 21.356 68.4579 22.508C67.7379 23.66 66.6819 24.572 65.2899 25.244C63.8979 25.916 62.2299 26.252 60.2859 26.252C57.3339 26.252 54.8979 25.544 52.9779 24.128C51.0819 22.712 50.0499 20.696 49.8819 18.08H57.4059C57.4779 18.968 57.7539 19.628 58.2339 20.06C58.7139 20.492 59.3019 20.708 59.9979 20.708C60.6219 20.708 61.1019 20.552 61.4379 20.24C61.7979 19.928 61.9779 19.484 61.9779 18.908C61.9779 18.14 61.6299 17.552 60.9339 17.144C60.2379 16.712 59.1339 16.244 57.6219 15.74C56.0139 15.188 54.6819 14.648 53.6259 14.12C52.5939 13.592 51.6939 12.8 50.9259 11.744C50.1819 10.688 49.8099 9.332 49.8099 7.676C49.8099 6.092 50.2179 4.736 51.0339 3.608C51.8499 2.456 52.9659 1.592 54.3819 1.016C55.7979 0.415999 57.4059 0.115999 59.2059 0.115999C62.1339 0.115999 64.4619 0.811999 66.1899 2.204C67.9419 3.572 68.9019 5.504 69.0699 8H61.4739C61.3779 7.208 61.1259 6.62 60.7179 6.236C60.3339 5.852 59.8179 5.66 59.1699 5.66C58.6179 5.66 58.1859 5.804 57.8739 6.092C57.5619 6.38 57.4059 6.812 57.4059 7.388C57.4059 8.108 57.7419 8.672 58.4139 9.08C59.1099 9.488 60.1899 9.944 61.6539 10.448C63.2619 11.024 64.5939 11.588 65.6499 12.14C66.7059 12.692 67.6179 13.496 68.3859 14.552C69.1539 15.608 69.5379 16.976 69.5379 18.656ZM86.4312 12.968L96.2952 26H87.7632L79.7352 14.732V26H72.6432V0.512H79.7352V11.528L87.8352 0.512H96.2952L86.4312 12.968Z" fill="black"/>
                  <path d="M121.88 0.512L112.88 17.9V26H105.824V17.9L96.8237 0.512H104.924L109.424 10.232L113.888 0.512H121.88ZM130.199 19.088V26H123.035V19.088H130.199Z" fill="#FABB18"/>
                </svg> */}
                  <img src={globalFormValues.company.logo} />
              </div>
              :
              <h3 className="fs-40 fw-4">Invoice</h3>
            }

              <div class="company-details-wrapper d-flex">
                
              </div>
            </div>

            {/* <div className="client-details-wrapper invoice-details">
              <div class="details-item mr-16">
                <span>Invoice No.</span>
                <p>12356</p>
              </div>
              <div class="details-item ml-16">
                <span>Invoice Date</span>
                <p>{moment().format("DD MMM, yyyy")}</p>
              </div>
            </div> */}

            <div class="client-details-wrapper">
              <div class="left">
                <label className="fw-6 fs-16">Bill From</label>
                <div class="details-item fs-16">
                  <span>Company</span>
                  <p>{globalFormValues.company.name}</p>
                  <p>{globalFormValues.company.phone}</p>
                  <p>{globalFormValues.company.email}</p>
                </div>
                <div class="details-item fs-16">
                  <span>Address</span>
                  <p>{globalFormValues.company.address && globalFormValues.company.address.address_line_1}</p>
                  <p>{globalFormValues.company.address && globalFormValues.company.address.address_line_2}</p>
                  <p>{globalFormValues.company.address && globalFormValues.company.address.state}</p>
                  <p>{globalFormValues.company.address && globalFormValues.company.address.country}</p>
                </div>
              </div>
              <div class="right">
                <label className="fw-6 fs-16">Bill To</label>
                <div class="details-item fs-16">
                  <span>Client</span>
                  <p>{globalFormValues.client.name}</p>
                  <p>{globalFormValues.client.phone}</p>
                  <p>{globalFormValues.client.email}</p>
                </div>
                <div class="details-item fs-16">
                  <span>Address</span>
                  <p>{globalFormValues.client.address && globalFormValues.client.address.address_line_1}</p>
                  <p>{globalFormValues.client.address && globalFormValues.client.address.address_line_2}</p>
                  <p>{globalFormValues.client.address && globalFormValues.client.address.state}</p>
                  <p>{globalFormValues.client.address && globalFormValues.client.address.country}</p>
                </div>
              </div>
            </div>

            <div class="total-wrapper">
              <span className="fs-16">Total Amount</span>
              <span>$300.00</span>
            </div>

            <table>
              <thead>
                <tr>
                  <th className="fs-16">Description</th>
                  <th className="fs-16">Rate</th>
                  <th className="fs-16">Qty</th>
                  <th className="fs-16">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {globalFormValues.invoiceItems.invoiceItems && globalFormValues.invoiceItems.invoiceItems.map((item, index) =>
                  <tr className="fs-16" key={`invoice-item-${index}`}>
                    <td className="fs-16">
                      <p class="invoice-name color-dark">{item.description}</p>
                    </td>
                    <td className="fs-16">${item.price}</td>
                    <td className="fs-16">{item.quantity}</td>
                    <td className="fs-16">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div class="note-wrapper fs-14">
              <span>Note</span>
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at a layout. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
	);
}

export default PDFInvoicePreviewTemplate;
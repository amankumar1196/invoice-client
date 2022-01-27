import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ModalPortal from "../../components/modal/ModalPortal";
import illustration from "../../assests/img/login1.svg"
import OnboardForm from "./Onboarding/OnboardForm";
import { createOnboarding } from "../../redux/actions/onBoardingActions"

function WelcomeModal(props) {
  const { currentUser: { companies} } = props
  const [isVisible, setVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState(1);

  useEffect(() => {
    let onBoardingModal = JSON.parse(sessionStorage.getItem("onBoardingModal"));
    if(!onBoardingModal && companies && companies.length === 0) {
      setTimeout(()=> setVisible(true), 1000)
    } else setVisible(false); 
  },[companies])

  const handleBoardingModalClose = () => {
    sessionStorage.setItem("onBoardingModal", true);
    setVisible(false)
  }

  const handleOnboardingFormSubmit = async (data) => {
    await props.dispatch(createOnboarding(data, { include: [ "address"]}));
    setCurrentForm(3);
  }

  return (
    <ModalPortal>
      <div class="welcome-modal">
        <div class={`modal ${ isVisible ? "show" : "fade"}`} id="editBudgetModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
          <div class="modal-dialog modal-dialog-center modal-lg">
            <div class="modal-content pt-32">
              {/* <div class="modal-header pt-24 px-24 border-bottom-0 d-flex align-items-center"> */}
                <div class="close mr-8" onClick={() => handleBoardingModalClose()} data-dismiss="modal" aria-label="Close"><i class="bx bx-x text-neutral-900 font-size-24"></i></div>
              {/* </div> */}
              <div class="modal-body pt-0 px-24 pt-16">
                { currentForm === 1 &&
                  <div class="d-flex">
                    <div class="d-flex flex-column justify-content-between pr-32">
                      <div>
                        <h3 className="fs-24">Welcome to <strong className="color-primary">Invoicer</strong></h3>
                        <p className="fs-12 pt-20 pb-32">Modern way to organize and schedule your invoices with quick access and actions.</p>
                        <p className="fs-12">We're excited to have you get started. <strong>Generate</strong> your <strong>first invoice</strong>, by setup your account. Just press the button below.</p>
                      </div>
                      <button class="btn btn-primary w-100" onClick={() => setCurrentForm(2)}>Account Setup</button>
                    </div>
                    <img className="illustration pl-16" src={illustration} />
                  </div>
                }
                { currentForm === 2 &&
                  <div class="d-flex flex-column justify-content-between pr-16 pl-16 pb-16">
                    <h3 className="fs-24 pb-16 color-primary">Account Setup</h3>
                    <OnboardForm handleSubmit={ handleOnboardingFormSubmit }/>
                  </div>
                }
                { currentForm === 3 &&
                  <div class="d-flex flex-column align-items-center pr-16 pl-16 pb-16">
                    <h3 className="fs-40 color-primary color-success"><i className="bx bx-check-circle"></i></h3>
                    <h3 className="fs-24 pb-32 color-primary">Account Setuped Successfully</h3>
                    <button class="btn btn-primary w-50 mt-32" onClick={() => setVisible(false)}>Let's Start</button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
	);
}

function mapStateToProps(state) {
  const { client, auth } = state;
  return {
    client: client.client,
    clientEditingId: client.editing,
    currentUser: auth.user
  };
}

export default connect(mapStateToProps)(WelcomeModal);
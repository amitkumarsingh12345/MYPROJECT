import React from 'react'
import NavLink from 'react-bootstrap/esm/NavLink';

const Footer = () => {
    return (
        <>
            <footer
                className="text-center text-lg-start text-white bg-dark"
                style={{ backgroundColor: "#ECEFF1" }}
            >

                <section
                    className="d-flex justify-content-between p-4 text-dark bg-light m-0"
                >

                    <div className="me-5">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div className='d-flex'>
                        <NavLink href="https://youtu.be/aztcef6mrPg?si=G5ekR6UKr0893Es1" className="text-dark me-4" target='_blank'>
                            <i className="fa-brands fa-youtube"></i>
                        </NavLink>
                        <NavLink href="https://in.indeed.com/" target='_blank' className="text-dark me-4">
                            <img width="16" height="16" src="https://img.icons8.com/windows/32/indeed.png" alt="indeed" />
                        </NavLink>

                        <NavLink href="https://www.linkedin.com/in/amit-kumar-singh-56551b292" target='_blank' className="text-dark me-4">
                            <i className="fab fa-linkedin"></i>
                        </NavLink>
                        <NavLink href="https://github.com/amitkumarsingh12345" className="text-dark me-4" target='_blank'>
                            <i className="fab fa-github"></i>
                        </NavLink>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">

                        <div className="row mt-3">


                            <div className="col-md-2 col-lg-4 col-xl-4 mx-auto mb-4">

                                <h6 className="text-uppercase fw-bold">About Project</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                />
                                <p>
                                    This is the title of that project
                                    <b> "E-COMMERCE WEBSITE"</b> to developed by iics college student <b>"AMIT KUMAR SINGH"</b>. the company initially focused online book sales before expending into other product categories such as consumer electronics, fashions, home essentials, groceries, and life style product.
                                </p>

                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Useful links</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                />
                                <p>
                                    <a href="https://github.com/amitkumarsingh12345" className="text-white" target='_blank'>Gethub</a>
                                </p>
                                <p>
                                    <a href="https://www.linkedin.com/in/amit-kumar-singh-56551b292" target='_blank' className="text-white">Linkedin</a>
                                </p>
                                <p>
                                    <a href="https://in.indeed.com/" target='_blank' className="text-white">Indeed</a>
                                </p>
                                <p>
                                    <a href="https://youtu.be/aztcef6mrPg?si=G5ekR6UKr0893Es1" target='_blank' className="text-white">Youtube</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                                <h6 className="text-uppercase fw-bold">Programmer Contact</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                />
                                <p><i className="fas fa-home mr-3"></i> Tagore Town, Prayagraj 211002, Uttar Pradesh</p>
                                <p><i className="fas fa-envelope mr-3"></i> amitkumarsingh1482@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 96 481 482 36</p>
                                <p><i className="fas fa-print mr-3"></i> + 96 481 482 36</p>
                            </div>

                        </div>

                    </div>
                </section>

                <div
                    className="text-center p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >

                    <NavLink className="text-white fw-bold" href="https://iicscollege.in/"
                        target='_blank'
                    >IICS COLLEGE</NavLink>
                </div>

            </footer>

        </>
    )
}

export default Footer
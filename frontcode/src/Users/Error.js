import React from 'react'
import Nav from 'react-bootstrap/Nav';
import './Error.css'

const Error = () => {
	return (
		<div className='d-flex justify-content-center text-align-center w-100  bg-white'>
			<section class="page_404">
				<div class="container">
					<div class="row">
						<div class="col-sm-12 " style={{lineHeight:'10px'}}>
							<div class="col-sm-10 col-sm-offset-1  text-center">
								<div class="four_zero_four_bg">
									<h1 class="text-center ">404</h1>
								</div>

								<div class="contant_box_404">
									<h3 class="h2">
										Look like you're lost
									</h3>

									<p>the page you are looking for not avaible!</p>

									<Nav.Link href="/" className="link_404">Go to Home</Nav.Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Error
import NewHeader from "./NewHeader";
import Sidebar from "./Sidebar";
import React from "react";
import './PrivacyPolicy.css';

function PrivacyPolicy() {
    return (
        <div className="voter-app-container">
            <NewHeader />
            <div className="voter-main-content">
                <Sidebar />
                <div className="voter-content">
                <h2>Privacy Policy</h2>
                    <div className="privacy-policy">
                        <div>
                            <h3>1. Introduction</h3>
                            <p>This Privacy Policy outlines how we collect, use, disclose, and protect your personal data in accordance with the Personal Data Protection Act 2012 (PDPA) of Singapore. By using our e-voting system, you consent to the practices described in this policy.</p>
                            <br />

                            <h3>2. Collection of Personal Data</h3>
                            <p>We collect personal data that is necessary for the operation of the e-voting system, including but not limited to:</p>
                            <ul>
                                <li>Name</li>
                                <li>Contact Information (Email, Phone Number)</li>
                                <li>Voting Credentials</li>
                            </ul>
                            <br />
                            
                            <h3>3. Use of Personal Data</h3>
                            <p>Your personal data may be used for the following purposes:</p>
                            <ul>
                                <li>To verify your identity and eligibility to vote</li>
                                <li>To administer and manage the voting process</li>
                                <li>To ensure the security and integrity of the voting system</li>
                                <li>To communicate with you regarding voting procedures and results</li>
                                <li>To comply with legal and regulatory requirements</li>
                            </ul>
                            <br />
                            
                            <h3>4. Disclosure of Personal Data</h3>
                            <p>We will not disclose your personal data to any third parties except in the following circumstances:</p>
                            <ul>
                                <li>When required by law or regulation</li>
                                <li>To authorized personnel involved in the voting process</li>
                                <li>To service providers who assist us in operating the e-voting system, subject to strict confidentiality agreements</li>
                            </ul>
                            <br />
                            
                            <h3>5. Protection of Personal Data</h3>
                            <p>We implement appropriate security measures to protect your personal data from unauthorized access, use, or disclosure, including:</p>
                            <ul>
                                <li>Encryption of data in transit and at rest (e.g., using HTTPS and BitLocker)</li>
                                <li>Secure authentication mechanisms (e.g., corporate-only software, RSA Signatures)</li>
                                <li>Regular security audits and vulnerability assessments</li>
                            </ul>
                            <br />
                            
                            <h3>6. Retention of Personal Data</h3>
                            <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Personal data will be securely deleted or anonymized when it is no longer needed.</p>
                            <br />
                            
                            <h3>7. Access and Correction</h3>
                            <p>You have the right to request access to your personal data and to correct any inaccuracies. To exercise these rights, please contact our Data Protection Officer at [contact information].</p>
                            <br />
                            
                            <h3>8. Changes to Privacy Policy</h3>
                            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated policy will be posted on our website, and the date of the latest revision will be indicated.</p>
                            <br />
                            
                            <h3>9. Contact Us</h3>
                            <p>If you have any questions or concerns about our privacy practices, please contact our Data Protection Officer at:</p>
                            <p>[Company Name]<br />
                            [Address]<br />
                            [Email]<br />
                            [Phone Number]</p>
                            <br />
                            
                            <h3>10. Governing Law</h3>
                            <p>This Privacy Policy is governed by the laws of Singapore.</p><br />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;

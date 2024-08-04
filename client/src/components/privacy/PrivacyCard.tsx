/* eslint-disable react/no-unescaped-entities */
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="flex-1 flex justify-center">
            <section className="w-full max-w-4xl py-12 md:py-24 lg:py-32 px-4">
                <Accordion type="single" collapsible defaultValue="introduction">
                    <AccordionItem value="introduction">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Introduction</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                MoTalent is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered recruitment platform ("Platform"). By using the Platform, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-collection">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Data Collection</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                We collect personal information that you voluntarily provide to us when you create an account, fill out forms, upload CVs, and interact with the Platform. This may include:
                                <ul className="list-disc pl-5">
                                    <li>Name: Your full name as provided during account registration or CV submission.</li>
                                    <li>Email address: The email address you use to register on the Platform or communicate with us.</li>
                                    <li>Contact information: Additional contact details such as your phone number and postal address.</li>
                                    <li>Employment history: Details of your previous employment, including job titles, company names, durations, and responsibilities.</li>
                                    <li>Educational background: Information about your educational qualifications, including institutions attended, degrees obtained, and graduation dates.</li>
                                    <li>Skills and qualifications: A summary of your professional skills, certifications, and qualifications relevant to job applications.</li>
                                    <li>Professional references: Contact information and details about individuals who can vouch for your professional experience and character.</li>
                                    <li>Other information included in your CV or job applications: Any additional details you choose to include in your CV or job applications, such as personal projects, publications, or volunteer work.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-usage">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Data Usage</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                We use the information we collect for various purposes, including to:
                                <ul className="list-disc pl-5">
                                    <li>Provide and maintain our services: To operate and provide our Platform, including enabling you to apply for jobs, manage your profile, and communicate with potential employers.</li>
                                    <li>Improve our services: To understand and analyze how you use our Platform, to develop new products, services, features, and functionality, and to improve and optimize our Platform.</li>
                                    <li>Communicate with you: To send you notifications, updates, and other information related to the Platform, respond to your inquiries, provide customer support, and send marketing and promotional communications.</li>
                                    <li>Process job applications: To facilitate the job application process by sharing your information with potential employers and enabling employers to review your application and contact you.</li>
                                    <li>Legal compliance: To comply with legal obligations, resolve disputes, and enforce our agreements.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-sharing">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Data Sharing</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                We may share your information in the following situations:
                                <ul className="list-disc pl-5">
                                    <li>With employers: To facilitate job applications, we share relevant information with potential employers.</li>
                                    <li>Service providers: We may employ third-party companies and individuals to facilitate our services, provide the service on our behalf, or assist us in analyzing how our service is used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
                                    <li>Legal requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency). This includes:
                                        <ul className="list-disc pl-5">
                                            <li>Compliance with legal obligations: Disclosing your information to comply with applicable laws, regulations, legal processes, or governmental requests.</li>
                                            <li>Protection of rights and safety: Disclosing your information to enforce our terms and conditions, protect our rights, privacy, safety, or property, and/or that of you or others.</li>
                                            <li>Fraud prevention: Disclosing your information to investigate, prevent, or take action regarding illegal activities, suspected fraud, and situations involving potential threats to the physical safety of any person.</li>
                                        </ul>
                                    </li>
                                    <li>Business transfers: In the event of a merger, acquisition, reorganization, sale of assets, or bankruptcy, we may transfer or share your information as part of such transaction. Your information may be transferred to a successor or affiliate as part of a merger, acquisition, or other business restructuring.</li>
                                    <li>With your consent: We may disclose your information for any other purpose with your consent.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-security">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Data Security</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                We take the security of your data seriously and use industry-standard measures to protect your information. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-retention">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Data Retention</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. The criteria used to determine our retention periods include:
                                <ul className="list-disc pl-5">
                                    <li>The duration of your relationship with us: We retain your personal information while your account is active or as needed to provide you with our services.</li>
                                    <li>Legal requirements: We retain your personal information as required by applicable laws and regulations.</li>
                                    <li>Business needs: We retain your personal information as necessary for legitimate business purposes, such as maintaining business records, complying with legal obligations, resolving disputes, and enforcing our agreements.</li>
                                </ul>
                                When we no longer need to retain your personal information, we will either delete or anonymize it or, if this is not possible, securely store your personal information and isolate it from any further use until deletion is possible.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="your-rights">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Your Rights</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                Depending on your location, you may have the following rights regarding your personal information:
                                <ul className="list-disc pl-5">
                                    <li>Access: You have the right to request access to your personal information that we hold about you.</li>
                                    <li>Rectification: You have the right to request correction of inaccurate or incomplete personal information.</li>
                                    <li>Erasure: You have the right to request the deletion of your personal information, subject to certain conditions.</li>
                                    <li>Restriction: You have the right to request that we restrict the processing of your personal information under certain circumstances.</li>
                                    <li>Data portability: You have the right to request the transfer of your personal information to another organization or directly to you, under certain conditions.</li>
                                    <li>Objection: You have the right to object to the processing of your personal information under certain circumstances.</li>
                                    <li>Withdraw consent: If we are processing your personal information based on your consent, you have the right to withdraw your consent at any time. This will not affect the lawfulness of any processing conducted prior to your withdrawal.</li>
                                </ul>
                                To exercise any of these rights, please contact us using the contact details provided in Section 10. We may ask you to verify your identity before responding to such requests.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="international-data-transfers">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">International Data Transfers</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                Your information, including personal data, may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. By using our Platform and providing us with your information, you consent to the transfer of your information to countries outside your country of residence, including the United States.
                                We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and that no transfer of your personal information will take place to an organization or a country unless there are adequate controls in place, including the security of your data and other personal information.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="changes-to-privacy-policy">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Changes to This Privacy Policy</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="contact-us">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Contact Us</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                If you have any questions about this Privacy Policy, please contact us at:
                                <ul className="list-disc pl-5">
                                    <li>Email: erkadoovince@gmail.com</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
    );
}

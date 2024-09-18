/* eslint-disable react/no-unescaped-entities */
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";

export default function WorkersRightsAct() {
    return (
        <main className="flex-1 flex justify-center">
            <section className="w-full max-w-4xl py-12 md:py-24 lg:py-32 px-4">
                <Accordion type="single" collapsible defaultValue="introduction">
                    
                    {/* Introduction */}
                    <AccordionItem value="introduction">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Introduction</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Workers' Rights Act 2019 governs the rights, duties, and protections of workers within the Republic of Mauritius. The Act ensures that workers receive fair treatment, proper compensation, and safe working conditions. This section provides a comprehensive breakdown of workers' rights as outlined in the Act.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Anti-Discrimination */}
                    <AccordionItem value="anti-discrimination">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Anti-Discrimination in Employment and Occupation</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Workers' Rights Act 2019 prohibits any form of discrimination in the workplace based on race, gender, age, religion, marital status, disability, or political opinion. It ensures equal opportunities for all employees in recruitment, promotion, and other employment-related matters. 
                                <ul className="list-disc pl-5">
                                    <li>Employers must not treat workers differently based on personal characteristics such as race, gender, religion, or political beliefs.</li>
                                    <li>Promotion opportunities must be available to all employees, based on merit and without discrimination.</li>
                                    <li>Workers have the right to raise grievances if they believe they are being discriminated against.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Minimum Age for Employment */}
                    <AccordionItem value="minimum-age">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Minimum Age for Employment</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Act sets the minimum age for employment at 16 years old, in line with the provisions to prevent child labor. Employment of young persons between 16 and 18 is allowed but subject to specific protections.
                                <ul className="list-disc pl-5">
                                    <li>Children under the age of 16 cannot be employed in any capacity.</li>
                                    <li>Youths aged between 16 and 18 may work, but not in jobs that could endanger their health, safety, or morals.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Work Agreements */}
                    <AccordionItem value="work-agreements">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Work Agreements</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                Every worker must have a formal work agreement with their employer, whether it is in writing or implied. The Act defines different types of work agreements and the minimum requirements for each.
                                <ul className="list-disc pl-5">
                                    <li>Work agreements must clearly state the job role, remuneration, and conditions of employment.</li>
                                    <li>Both part-time and full-time workers must have written agreements.</li>
                                    <li>Employment agreements cannot be terminated without following proper procedures as outlined in the Act.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Working Hours and Conditions */}
                    <AccordionItem value="working-hours">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Working Hours and Conditions</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Act defines normal working hours and the conditions under which overtime, shift work, and flexible work schedules may be implemented.
                                <ul className="list-disc pl-5">
                                    <li>Normal working hours are set at 45 hours per week, with no more than 9 hours per day.</li>
                                    <li>Overtime must be paid at a rate higher than normal wages, typically at 1.5 times the regular hourly rate.</li>
                                    <li>Workers are entitled to meal breaks and rest periods as part of their working day.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Remuneration */}
                    <AccordionItem value="remuneration">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Remuneration and Equal Pay</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Act ensures that all workers are fairly remunerated for their work. Employers are required to provide equal remuneration for work of equal value, and workers are entitled to additional remuneration for overtime, work on public holidays, and other special circumstances.
                                <ul className="list-disc pl-5">
                                    <li>Workers performing work of equal value must receive equal pay, regardless of gender or any other personal characteristics.</li>
                                    <li>Remuneration includes wages, bonuses, and allowances, and must be paid at regular intervals.</li>
                                    <li>Employers cannot make unlawful deductions from a worker's salary.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Termination of Employment */}
                    <AccordionItem value="termination">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Termination of Employment</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Act provides clear guidelines on how employment contracts may be terminated. Workers are protected from unjust dismissal, and employers must follow proper procedures when terminating an employment contract.
                                <ul className="list-disc pl-5">
                                    <li>Employers must provide reasonable notice of termination, as outlined in the work agreement.</li>
                                    <li>Severance pay may be due to the worker depending on the circumstances of the termination.</li>
                                    <li>Unfair or discriminatory termination can be challenged in court, and workers may be entitled to compensation if their termination is deemed unjustified.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Leaves and Other Benefits */}
                    <AccordionItem value="leaves-benefits">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Leaves and Other Benefits</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                Workers are entitled to various types of leave, including annual leave, sick leave, maternity and paternity leave, and special leave for specific circumstances.
                                <ul className="list-disc pl-5">
                                    <li>Workers are entitled to a minimum of 20 days of paid annual leave per year.</li>
                                    <li>Workers are also entitled to paid sick leave in case of illness, as well as maternity and paternity leave.</li>
                                    <li>Special leave may be granted for personal reasons, such as bereavement or jury duty.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* End of Year Bonus */}
                    <AccordionItem value="end-year-bonus">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">End of Year Bonus</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                Workers are entitled to receive an end-of-year bonus equivalent to one-twelfth of their annual salary. This bonus must be paid by the employer before the end of December each year.
                                <ul className="list-disc pl-5">
                                    <li>The bonus is calculated based on the worker's total annual salary.</li>
                                    <li>If a worker has been employed for less than a full year, the bonus is prorated based on the length of employment.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Death Grant and Gratuity */}
                    <AccordionItem value="death-grant">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Death Grant and Gratuity</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                In the unfortunate event of a worker's death, their family or legal beneficiaries may be entitled to a death grant and gratuity. The amount is calculated based on the worker's salary and the length of employment.
                                <ul className="list-disc pl-5">
                                    <li>Beneficiaries are entitled to a lump sum death grant to help cover funeral expenses.</li>
                                    <li>A gratuity payment is also made, based on the worker's length of service and salary.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Workfare Programme and Portable Retirement Gratuity */}
                    <AccordionItem value="workfare-programme">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Workfare Programme and Portable Retirement Gratuity</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Act establishes the Workfare Programme and Portable Retirement Gratuity Fund to provide support for workers who lose their jobs and to ensure that workers can carry their retirement benefits from one employer to another.
                                <ul className="list-disc pl-5">
                                    <li>The Workfare Programme Fund provides financial assistance to workers who are laid off or become unemployed.</li>
                                    <li>The Portable Retirement Gratuity Fund ensures that workers' retirement benefits follow them from one employer to another, preventing loss of gratuity during job changes.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Violence at Work */}
                    <AccordionItem value="violence-work">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Violence at Work</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Act provides protection against violence and harassment in the workplace. Employers must take necessary steps to ensure the safety of workers, and any form of workplace violence will be punished.
                                <ul className="list-disc pl-5">
                                    <li>Employers are responsible for providing a safe working environment, free from violence or harassment.</li>
                                    <li>Workers can report incidents of violence or harassment without fear of retaliation.</li>
                                    <li>Penalties are in place for employers or workers who engage in violent behavior at work.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Administration and Miscellaneous */}
                    <AccordionItem value="administration">
                        <AccordionTrigger>
                            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Administration and Miscellaneous</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                                The Act outlines the roles of government agencies and authorities in the enforcement of workers' rights. Employers must maintain records, and the government may conduct inspections to ensure compliance with the Act.
                                <ul className="list-disc pl-5">
                                    <li>Employers must maintain records of employees and their employment conditions.</li>
                                    <li>The government can conduct inspections to ensure that employers are complying with the Act.</li>
                                    <li>Workers can file complaints if they believe their rights have been violated.</li>
                                </ul>
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
    );
}

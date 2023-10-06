import React from 'react';
import { LockClosedIcon, UserGroupIcon, SparklesIcon, UsersIcon } from '@heroicons/react/20/solid';
import { v4 } from 'uuid';
import { aboutConfig } from '@/config/about';
import { User } from 'lucide-react';

const features = [
    {
        name: 'Loyalty',
        description:
            "At Nubri, loyalty isn't just a buzzword; it's a foundational pillar that drives every interaction, project, and long-term relationship we foster. We understand that managing proprietary data is no small feat, and entrusting us with that responsibility is a significant decision for our corporate clients. That's why we're committed to being not just a service provider, but a reliable partner. We invest deeply in understanding your unique needs and challenges, continually adapting our solutions to ensure your data remains secure, accessible, and useful. Our aim is to earn your trust for the long haul, because to us, loyalty means more than just a contract—it's a mutual commitment to shared success.",
        icon: UserGroupIcon,
    },
    {
        name: 'Trust',
        description:
            "In the world of corporate data management, trust is non-negotiable. We get it, your data is invaluable, and any misstep can have colossal consequences. That's why at Nubri, we employ state-of-the-art Advanced LLM (Lifelong Learning Machines) to ensure that your data isn't just managed, but managed right. Our team of experts works tirelessly to keep up with the latest security protocols and compliance regulations. We regularly audit our systems and provide transparent reports, ensuring you're never in the dark about how your data is being handled. Our aim is to be a company you can rely on, without a second thought.",
        icon: LockClosedIcon,
    },
    {
        name: 'Compassion',
        description:
            "Data management is often seen as a cold, mechanical process, but at Nubri, we believe in bringing a human touch to everything we do. Compassion for us means understanding the very real human elements at play—the stress of meeting regulatory requirements, the pressure to innovate, and the simple need for a listening ear. We're more than just tech support; we're people who genuinely care about your team's well-being. We make it a point to be available for our clients, offering 24/7 support and ensuring that in times of crisis, you're never alone. Compassion is our way of acknowledging that beyond the bytes and bits, there are people counting on us.",
        icon: SparklesIcon,
    },
    {
        name: 'Leadership',
        description:
            "Leading the charge in an industry as dynamic as data management requires more than just cutting-edge technology; it requires vision, courage, and the ability to inspire change. Nubri prides itself on being at the forefront of employing Advanced LLM in data management, setting industry benchmarks, and pushing the envelope in what’s possible. We don’t just adapt to industry trends; we aim to be the ones setting them. Our leadership manifests in our innovative solutions, but also in the partnerships we nurture, the talent we cultivate, and the community we build around us. Leadership for us is not about being ahead; it’s about bringing everyone along for the journey toward excellence.",
        icon: UsersIcon,
    },
];

const AboutPage = () => {
    return (
        <div className="bg-white py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-gray-600">{aboutConfig.title}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {aboutConfig.subTitle}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">{aboutConfig.description}</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-400">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

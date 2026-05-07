'use client';

import { useState } from 'react';

import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MagneticButton } from '@/components';
import { socialMedias } from '@/data';
import { Navbar, Transition } from '@/layout';
import { useTranslation } from '@/providers';
import { randomId } from '@/utils';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

function buildWhatsappMessage(form, t) {
  const lines = [t('contactPage.whatsapp.greeting'), ''];
  lines.push(`*${t('contactPage.whatsapp.nameLabel')}:* ${form.name.trim()}`);
  lines.push(`*${t('contactPage.whatsapp.emailLabel')}:* ${form.email.trim()}`);
  if (form.organization.trim()) {
    lines.push(
      `*${t('contactPage.whatsapp.organizationLabel')}:* ${form.organization.trim()}`,
    );
  }
  if (form.services.trim()) {
    lines.push(
      `*${t('contactPage.whatsapp.servicesLabel')}:* ${form.services.trim()}`,
    );
  }
  lines.push('');
  lines.push(`*${t('contactPage.whatsapp.messageLabel')}:*`);
  lines.push(form.message.trim());
  return lines.join('\n');
}

const initialForm = {
  name: '',
  email: '',
  organization: '',
  services: '',
  message: '',
};

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = field => event => {
    setForm(prev => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = t('contactPage.errors.name');
    }
    if (!isValidEmail(form.email)) {
      nextErrors.email = t('contactPage.errors.email');
    }
    const trimmedMessage = form.message.trim();
    if (trimmedMessage.length < 3 || trimmedMessage.length > 3000) {
      nextErrors.message = t('contactPage.errors.message');
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const text = buildWhatsappMessage(form, t);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  };

  const fields = [
    {
      number: '01',
      key: 'name',
      type: 'input',
      inputType: 'text',
      autoComplete: 'name',
      required: true,
    },
    {
      number: '02',
      key: 'email',
      type: 'input',
      inputType: 'email',
      autoComplete: 'email',
      required: true,
    },
    {
      number: '03',
      key: 'organization',
      type: 'input',
      inputType: 'text',
      autoComplete: 'organization',
      required: false,
    },
    {
      number: '04',
      key: 'services',
      type: 'input',
      inputType: 'text',
      autoComplete: 'off',
      required: false,
    },
    {
      number: '05',
      key: 'message',
      type: 'textarea',
      autoComplete: 'off',
      required: true,
    },
  ];

  return (
    <Transition>
      <div className='relative bg-foreground text-background'>
        <Navbar />
        <main className='pb-32 pt-32 lg:pt-40'>
          <div className='container mx-auto px-8 lg:px-16'>
            <h1 className='text-[clamp(2.5em,7vw,7em)] leading-none'>
              <span className='block'>{t('contactPage.title1')}</span>
              <span className='block'>{t('contactPage.title2')}</span>
            </h1>

            <div className='mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-20'>
              <form
                className='flex flex-col gap-2'
                onSubmit={handleSubmit}
                noValidate
              >
                {fields.map(field => (
                  <FormField
                    key={field.key}
                    {...field}
                    label={t(`contactPage.fields.${field.key}.label`)}
                    placeholder={t(
                      `contactPage.fields.${field.key}.placeholder`,
                    )}
                    value={form[field.key]}
                    error={errors[field.key]}
                    onChange={updateField(field.key)}
                  />
                ))}

                <div className='-mt-20 flex justify-end'>
                  <MagneticButton
                    type='submit'
                    variant='primary'
                    size='xl'
                    className='aspect-square !h-40 !w-40 !p-0'
                  >
                    <span className='text-base'>{t('contactPage.send')}</span>
                  </MagneticButton>
                </div>
              </form>

              <ContactSidebar />
            </div>
          </div>
        </main>
      </div>
    </Transition>
  );
}

function FormField({
  number,
  type,
  inputType,
  autoComplete,
  required,
  label,
  placeholder,
  value,
  error,
  onChange,
}) {
  const fieldId = `field-${number}`;
  const baseInput =
    'w-full bg-transparent text-2xl text-background placeholder:text-muted-foreground focus:outline-none lg:text-3xl';

  return (
    <div className='border-b border-solid border-muted-foreground/40 py-8'>
      <div className='flex items-start gap-6'>
        <span className='mt-3 text-xs text-muted-foreground'>{number}</span>
        <div className='flex-1'>
          <label
            htmlFor={fieldId}
            className='mb-3 block text-xl font-medium lg:text-2xl'
          >
            {label}
          </label>
          {type === 'textarea' ? (
            <textarea
              id={fieldId}
              rows={4}
              autoComplete={autoComplete}
              required={required}
              placeholder={`${placeholder}${required ? ' *' : ''}`}
              value={value}
              onChange={onChange}
              className={`${baseInput} resize-none`}
            />
          ) : (
            <input
              id={fieldId}
              type={inputType}
              autoComplete={autoComplete}
              required={required}
              placeholder={`${placeholder}${required ? ' *' : ''}`}
              value={value}
              onChange={onChange}
              className={baseInput}
            />
          )}
          {error ? (
            <div className='mt-3 flex items-center gap-2 text-sm text-destructive'>
              <span className='inline-block h-1.5 w-1.5 rounded-full bg-destructive' />
              <span>{error}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SideLink({ href, children, external = false }) {
  return (
    <li className='w-fit border-b border-solid border-b-transparent transition-all duration-300 ease-in-expo hover:border-b-current'>
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener' : undefined}
        passHref
      >
        <MagneticButton>{children}</MagneticButton>
      </Link>
    </li>
  );
}

function ContactSidebar() {
  const { t } = useTranslation();
  const whatsappLink = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : null;

  return (
    <aside className='flex flex-col gap-12 text-base lg:items-start'>
      <div className='flex w-full flex-col items-start gap-6'>
        <div className='relative aspect-square w-40 overflow-hidden rounded-full bg-foreground lg:w-36'>
          <Image
            src='/hero.png'
            alt='Vincent Conace'
            fill
            sizes='176px'
            className='object-cover'
          />
        </div>
        <ArrowDownRight size={28} strokeWidth={1.25} />
      </div>

      <div>
        <h5 className='text-xs uppercase text-muted-foreground'>
          {t('contactPage.sideContact')}
        </h5>
        <ul className='mt-4 flex flex-col items-start gap-2'>
          <SideLink href='mailto:conacevincent@gmail.com'>
            <span className='whitespace-nowrap'>conacevincent@gmail.com</span>
          </SideLink>
          {whatsappLink ? (
            <SideLink href={whatsappLink} external>
              {t('contactPage.whatsappLabel')}
            </SideLink>
          ) : null}
        </ul>
      </div>

      <div>
        <h5 className='text-xs uppercase text-muted-foreground'>
          {t('contactPage.sideBusiness')}
        </h5>
        <p className='mt-4'>{t('contactPage.location')}</p>
      </div>

      <div>
        <h5 className='text-xs uppercase text-muted-foreground'>
          {t('contactPage.sideSocials')}
        </h5>
        <ul className='mt-4 flex flex-col items-start gap-2'>
          {socialMedias.map(({ href, title }) => (
            <SideLink key={randomId()} href={href} external>
              {title}
            </SideLink>
          ))}
        </ul>
      </div>
    </aside>
  );
}

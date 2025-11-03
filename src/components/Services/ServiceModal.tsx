'use client';

import Modal from '@/components/shared/Modal';
import { ServiceItem } from './types';

type Props = {
  open: boolean;
  service: ServiceItem | null;
  onClose: () => void;
};

export default function ServiceModal({ open, service, onClose }: Props) {
  if (!open || !service) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={service.title}
      size="xl"
    >
      <div className="grid gap-6">
          <p className="leading-relaxed">{service.description}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {service.residential && (
              <section className="rounded-2xl border p-4">
                <h4 className="font-semibold mb-2">Residencial</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.residential.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
            {service.business && (
              <section className="rounded-2xl border p-4">
                <h4 className="font-semibold mb-2">Empresarial</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.business.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
            {service.industrial && (
              <section className="rounded-2xl border p-4 sm:col-span-2">
                <h4 className="font-semibold mb-2">Industrial</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.industrial.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
          </div>
      </div>
    </Modal>
  );
}

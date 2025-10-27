export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="font-title font-semibold mb-2 text-primary">ROTEC Service</h4>
          <p className="text-sm text-gray-600">
            Desde 1993 atendendo residencial, empresarial e industrial com
            segurança, agilidade e eficiência.
          </p>
        </div>

        <div>
          <h5 className="font-title font-semibold mb-2">Contato</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Telefone: (xx) xxxx-xxxx</li>
            <li>WhatsApp: (xx) xxxxx-xxxx</li>
            <li>E-mail: contato@seudominio.com</li>
          </ul>
        </div>

        <div>
          <h5 className="font-title font-semibold mb-2">Atendimento</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Horário: 24h (emergências)</li>
            <li>Área de atendimento: (definir)</li>
          </ul>
        </div>

        <div>
          <h5 className="font-title font-semibold mb-2">Legal</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><a href="/privacidade" className="underline">Política de Privacidade</a></li>
            <li><a href="/termos" className="underline">Termos de Uso</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ROTEC Service. Todos os direitos reservados.
      </div>
    </footer>
  );
}

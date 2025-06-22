import base64
from typing import Dict, Any
from cosmpy.crypto.keypairs import PrivateKey
from cosmpy.aerial.wallet import LocalWallet
from cosmpy.aerial.client import LedgerClient, NetworkConfig

# Default network: Fetch.ai Dorado testnet
DEFAULT_NETWORK = NetworkConfig.fetchai_dorado_testnet()
# Default bank address for token additions
BANK_ADDRESS = "4b26b69c0deb75f0cffee0e5b798b9d346a87f6584050722376efaf9f15dac71"


def generate_wallet_key() -> str:
    """
    Generates a new Cosmos-compatible wallet private key and returns it as a hex string.
    """
    priv = PrivateKey()
    return priv.private_key_hex


def get_self_address(hex_priv: str) -> str:
    """
    Derives the wallet address from a hex-encoded private key.
    """
    b64_priv = base64.b64encode(bytes.fromhex(hex_priv)).decode()
    private_key = PrivateKey(b64_priv)
    wallet = LocalWallet(private_key)
    return wallet.address()


def wallet_create(hex_priv: str) -> LocalWallet:
    """
    Creates a LocalWallet instance from a hex-encoded private key.
    """
    b64_priv = base64.b64encode(bytes.fromhex(hex_priv)).decode()
    private_key = PrivateKey(b64_priv)
    return LocalWallet(private_key)


def view_amount(hex_priv: str, denom: str = "atestfet") -> Any:
    """
    Queries all balances on the Fetch.ai Dorado testnet and returns them.

    :param hex_priv: Hex-encoded private key.
    :param denom: Token denom to filter (unused here).
    :return: List of balances as dicts of 'denom' and 'amount'.
    """
    client = LedgerClient(DEFAULT_NETWORK)
    address = get_self_address(hex_priv)
    return client.query_bank_all_balances(address)


def send_token(amount: int, hex_priv: str, to_address: str, denom: str = "atestfet") -> Dict[str, Any]:
    """
    Sends tokens on the Fetch.ai Dorado testnet.

    :param amount: Amount in smallest unit.
    :param hex_priv: Sender's private key (hex-encoded).
    :param to_address: Recipient address.
    :param denom: Token denom (e.g., "atestfet").
    :return: Transaction result dict.
    """
    client = LedgerClient(DEFAULT_NETWORK)
    wallet = wallet_create(hex_priv)
    return client.send_tokens(to_address, amount, denom,wallet)


def add_token(hex_priv: str, amount: int, denom: str = "atestfet") -> Dict[str, Any]:
    """
    Sends tokens from the user's wallet to the predefined BANK_ADDRESS.

    :param hex_priv: Sender's private key (hex-encoded).
    :param amount: Amount in smallest unit to send.
    :param denom: Token denom (e.g., "atestfet").
    :return: Transaction result dict.

    """
    client = LedgerClient(DEFAULT_NETWORK)
    wallet1 = wallet_create(hex_priv)
    return send_token(amount, BANK_ADDRESS, wallet1.address(),denom)
